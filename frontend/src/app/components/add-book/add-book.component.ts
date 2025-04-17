import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {

  addBookForm!: FormGroup;

  constructor(
    private bookService: BookService,
  ){}

  ngOnInit() {
    this.addBookForm = new FormGroup({
      "title": new FormControl("", Validators.required),
      "author": new FormControl("", Validators.required),
      "genre": new FormControl("", Validators.required),
      "year": new FormControl(""),
    })
  }
  
  addBook() {
    this.bookService.saveBook(this.addBookForm.value).subscribe({
      next: (bookId) => console.log(bookId),
      error: (error) => console.log("Error occured while adding Book!", error)
    });
  }

  
}
