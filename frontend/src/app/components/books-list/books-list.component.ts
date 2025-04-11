import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { map, Observable, switchMap } from 'rxjs';
import { Page } from '../../models/page';
import { Book } from '../../models/book';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books$!: Observable<Page<Book>>;
  // currentPage: number = 0;
  constructor(
    // private router: Router,
    // private route: ActivatedRoute,
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.books$ = this.bookService.getBooks({});


    // this.route.queryParams.subscribe(params => {
    //   this.currentPage = params['page'] || 0;

    //   this.getBooks();
    // })
  }

  // getBooks() {
  //   this.books$ = this.bookService.getBooks({pageIndex: this.currentPage});
  // }

  // nextPage(page: number) {
  //  this.router.navigate([], {
  //   relativeTo: this.route,
  //   queryParams: {page},
  //   queryParamsHandling: 'merge'
  //  })
  // }
}
