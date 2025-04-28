import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Page, PageRequest, SortDirection } from '../../models/page';
import { Book } from '../../models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookStatus } from 'src/app/models/book-status';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {

  books$!: Observable<Page<Book>>;
  formVisibility: boolean = false;
  currentPage: number = 0;
  totalPages: number = 0;
  freeTextQuery: string = "";
  statusQuery: BookStatus = 'AVAILABLE';
  
  sortDirections: SortDirection[] = ['desc', 'asc'];
  pageSizes: number[] = [10,20,30];

  statuses = [
   {label: "Available", value: "AVAILABLE"},
   {label: "Borrowed", value: "BORROWED"},
   {label: "Returned", value: "RETURNED"},
   {label: "Damaged", value: "DAMAGED"},
   {label: "Processing", value: "PROCESSING"}];

  sorting = [
    {label: "Title", value: "title"},
    {label: "Author", value: "author"},
    {label: "Genre", value: "genre"},
    {label: "Year", value: "year"},
    {label: "Added", value: "added"},
    {label: "Popular", value: "checkOutCount"}
  ]

  pageRequest: PageRequest = {
    pageIndex: 0,
    pageSize: 20,
    sort: 'checkOutCount',
    direction: 'asc'
  }
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['view'] === 'list') {
        this.formVisibility = false;
      }
      this.getBooks();
    })
    
  }
  
  getBooks() {
    this.books$ = this.bookService.getBooks(this.pageRequest);
    this.books$.subscribe(pages => this.totalPages = pages.totalPages);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {page: this.pageRequest.pageIndex, size: this.pageRequest.pageSize, sort: this.pageRequest.sort, direction: this.pageRequest.direction},  
      queryParamsHandling: 'merge'
     })
  }

  getBooksByTitleContains() {
    this.books$ = this.bookService.getBooksContaining(this.freeTextQuery,this.pageRequest);
    this.books$.subscribe(pages => this.totalPages = pages.totalPages);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {page: this.pageRequest.pageIndex, size: this.pageRequest.pageSize, sort: this.pageRequest.sort, direction: this.pageRequest.direction},  
      queryParamsHandling: 'merge'
     })
  }
  getBooksByStatus() {
    this.books$ = this.bookService.getBooksByStatus(this.statusQuery,this.pageRequest);
    this.books$.subscribe(pages => this.totalPages = pages.totalPages);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {page: this.pageRequest.pageIndex, size: this.pageRequest.pageSize, sort: this.pageRequest.sort, direction: this.pageRequest.direction},  
      queryParamsHandling: 'merge'
     })
  }

  nextPage() {
   this.router.navigate([], {
    relativeTo: this.route,
    queryParams: {page: ++this.pageRequest.pageIndex},  
    queryParamsHandling: 'merge'
   })
   this.getBooks();
   this.getTotalPages();
  }

  prevPage() {
    this.router.navigate([], {
     relativeTo: this.route,
     queryParams: {page: --this.pageRequest.pageIndex},
     queryParamsHandling: 'merge'
    })
    this.getBooks();
    this.getTotalPages();
   }

  showForm() {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {view: 'form'},
        queryParamsHandling: 'merge'
      })
      this.formVisibility = true;
  }

  getTotalPages() {
    this.books$.subscribe(page => this.totalPages = page.totalPages);
  }
}


