import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { BookStatus } from 'src/app/models/book-status';
import { BookUpdate } from 'src/app/models/bookUpdate';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Checkout } from 'src/app/models/checkout';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  message: string = "";
  changeable: boolean = false;
  bookStatus: BookStatus = 'AVAILABLE';
  bookStatuses = [
    {label:"Available", value: 'AVAILABLE'},
    {label:"Borrowed", value: 'BORROWED'},
    {label:"Returned", value:'RETURNED'},
    {label:"Damaged", value:'DAMAGED'},
    {label:"Processing", value: 'PROCESSING'},
  ];

  bookUpdates: BookUpdate = {
    id: "",
    title: "",
    author: "",
    genre: "",
    year: 0,
    status: this.bookStatus,
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(map(params => params['id']))
      .subscribe(id => {
        this.bookService.getBook(id).subscribe(book => {
          this.bookUpdates.id = id;
          this.bookUpdates.title = book.title;
          this.bookUpdates.author = book.author;
          this.bookUpdates.genre = book.genre;
          this.bookUpdates.year = book.year;
          this.bookUpdates.status = book.status;
        });
      });

  }

  deleteBook() {
    this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.bookService.deleteBook(id))).subscribe({
        next: () => {
          alert("Book Deleted Successfully \n You will be redirected to Books");
          this.router.navigate(['/books']);
        },
        error: (error) => console.log("Book Deletion Error", error)
      });
  }

  checkOutBook() {
    this.checkoutService.saveCheckout(this.bookUpdates.title);
  }

  updateBook() { // WIP (left off here)
    this.bookService.updateBook(this.bookUpdates).subscribe({
      next:() => {
        this.message = "Book Updated successfully!"
        setTimeout(() => this.message="", 4000);
      },
      error: (error) => this.message = error.message
    }
    );
  }

  isChangeable() {
    if(this.changeable == false) {
      this.changeable = true;
    } else {
      console.log(this.bookUpdates)
      this.updateBook();
      this.changeable = false;
    }
    
  }
}

