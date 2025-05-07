import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { distinctUntilKeyChanged, Observable } from 'rxjs';
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

  books!: Book[];
  formVisibility: boolean = false;
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
    this.route.queryParams.pipe(distinctUntilKeyChanged('view')).subscribe((params) => {
      if(params['view'] == 'form') {
        this.formVisibility = true;
      } else {
        this.formVisibility = false;
        this.getBooks();
      }
    })
  }
  
  getBooks() {
    this.validatePage();
    this.bookService.getBooks(this.pageRequest).subscribe((books) => {
      this.books = books.content;
      this.totalPages = books.totalPages -1;
    });
  }

  getBooksByTitleContains() {
    this.bookService.getBooksContaining(this.freeTextQuery,this.pageRequest).subscribe(pageOfBooks => 
      this.totalPages = pageOfBooks.totalPages
    );
  }
  getBooksByStatus() {
    this.bookService.getBooksByStatus(this.statusQuery,this.pageRequest).subscribe(pageOfBooks => 
      this.totalPages = pageOfBooks.totalPages
    );
  }

  nextPage() {
   this.pageRequest.pageIndex++;
   this.getBooks();
  }

  prevPage() {
    this.pageRequest.pageIndex--;
    this.getBooks();
   }

  showForm() {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {view: 'form'},
        queryParamsHandling: 'merge'
      })
  }

  validatePage(){
    const page = this.pageRequest.pageIndex;
    if(page < 0 ) {
      this.pageRequest.pageIndex = 0;
    } else if(page > this.totalPages) {
      this.pageRequest.pageIndex = this.totalPages;
    }
  }

 
}


