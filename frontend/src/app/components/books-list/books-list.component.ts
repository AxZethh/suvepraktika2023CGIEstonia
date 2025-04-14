import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { Book } from '../../models/book';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {

  books$!: Observable<Page<Book>>;
  formVisibility: boolean = false;
  currentPage: number = 0;
  size: number = 20;
  pageSizes: number[] = [10,20,30];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] || 0;

      this.getBooks();
    })
  }

  getBooks() {
    console.log(this.currentPage);
    this.books$ = this.bookService.getBooks({pageIndex: this.currentPage, pageSize: this.size});
  }

  nextPage(page: number) {
   this.router.navigate([], {
    relativeTo: this.route,
    queryParams: {page: ++page, size: this.size},
    queryParamsHandling: 'merge'
   })
  }

  prevPage(page: number) {
    this.router.navigate([], {
     relativeTo: this.route,
     queryParams: {page: --page, size: this.size},
     queryParamsHandling: 'merge'
    })
   }



  showForm() {
      this.formVisibility = true;
  }
}
