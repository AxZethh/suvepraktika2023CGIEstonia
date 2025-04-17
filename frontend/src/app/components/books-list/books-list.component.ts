import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { map, Observable } from 'rxjs';
import { Page, PageRequest } from '../../models/page';
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
  filterBy: string[] = ["None","Available", "Borrowed", "Returned", "Damaged", "Processing"];
  sortBy: string = "id";
  direction: string = "desc"
  filter: string = "";
  totalPages: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {}

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.route.queryParams.subscribe(params => {
      if(params['view'] === 'list') {
        this.formVisibility = false;
      }
      this.currentPage = params['page'] || 0;
    })
    this.getBooks();
    this.books$.subscribe(pages => this.totalPages = pages.totalPages);
  }
  
  getBooks() {
    this.books$ = this.bookService.getBooks(this.buildPageRequest())
  }

  nextPage() {
   this.router.navigate([], {
    relativeTo: this.route,
    queryParams: {page: ++this.currentPage, size: this.size},  
    queryParamsHandling: 'merge'
   })
   this.getBooks();
   this.books$.subscribe(pages => this.totalPages = pages.totalPages);
  }

  prevPage() {
    this.router.navigate([], {
     relativeTo: this.route,
     queryParams: {page: --this.currentPage, size: this.size},
     queryParamsHandling: 'merge'
    })
    this.getBooks();
    this.books$.subscribe(pages => this.totalPages = pages.totalPages);
   }

  showForm() {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {view: 'form'},
        queryParamsHandling: 'merge'
      })
      this.formVisibility = true;
  }

  buildPageRequest(): PageRequest {
    return {
      pageIndex: this.currentPage,
      pageSize: this.size,
      sort: this.sortBy,
      direction: 'desc'
    }
  }
}


