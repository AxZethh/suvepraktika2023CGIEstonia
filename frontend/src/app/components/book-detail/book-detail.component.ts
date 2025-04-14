import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book$!: Observable<Book>;
  message: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {}

  ngOnInit(): void {
    this.book$ = this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.bookService.getBook(id)))
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
}
