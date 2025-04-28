import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { BookStatus } from 'src/app/models/book-status';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {

  addBookForm!: FormGroup;
  bookStatuses = [
    {label:"Available", value: 'AVAILABLE'},
    {label:"Borrowed", value: 'BORROWED'},
    {label:"Returned", value:'RETURNED'},
    {label:"Damaged", value:'DAMAGED'},
    {label:"Processing", value: 'PROCESSING'},
  ];
  constructor(
    private bookService: BookService,
  ){}

  ngOnInit() {
    this.addBookForm = new FormGroup({
      "title": new FormControl("", Validators.required),
      "author": new FormControl("", Validators.required),
      "genre": new FormControl("", Validators.required),
      "year": new FormControl("", Validators.required),
      "status": new FormControl("", Validators.required),
    })
  }
  
  addBook() {
    this.bookService.saveBook(this.addBookForm.value).subscribe({
      next: (bookId) => console.log(bookId),
      error: (error) => console.log("Error occured while adding Book!", error)
    });
  }

  
}
