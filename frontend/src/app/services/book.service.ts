import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page, PageRequest } from '../models/page';
import { Book } from '../models/book';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestUtil } from './rest-util';
import { BookStatus } from '../models/book-status';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly baseUrl = environment.backendUrl + '/api/book';

  constructor(
    private http: HttpClient,
  ) {}

  getBooks(filter: Partial<PageRequest>): Observable<Page<Book>> {
    const url = this.baseUrl + '/getBooks';
    const params = RestUtil.buildParamsFromPageRequest(filter);
    return this.http.get<Page<Book>>(url, {params});
  }
  getBooksByStatus(status: BookStatus, filter: Partial<PageRequest>): Observable<Page<Book>> {
    const url = this.baseUrl + '/getBooksByStatus';
    const params = new HttpParams()
        .set('page', filter.pageIndex!)
        .set('size', filter.pageSize!)
        .set('sort', filter.sort!)
        .set('status', status);
    return this.http.get<Page<Book>>(url, {params});
  }

  getBooksContaining(title: string, filter: Partial<PageRequest>): Observable<Page<Book>> {
    const url = this.baseUrl + '/getBooksByTitleContains';
    const params = new HttpParams()
        .set('page', filter.pageIndex!)
        .set('size', filter.pageSize!)
        .set('sort', filter.sort!)
        .set('title', title);
    return this.http.get<Page<Book>>(url, {params});
  }
  
  getBook(bookId: string): Observable<Book> {
    const url = this.baseUrl + '/getBook';
    const params = new HttpParams().set('bookId', bookId);
    return this.http.get<Book>(url, {params});
  }

  saveBook(book: Book): Observable<string> {
    const url = this.baseUrl + '/saveBook';
    return this.http.post<string>(url, book);
  }

  deleteBook(bookId: string): Observable<void> {
    const url = this.baseUrl + '/deleteBook';
    const params = new HttpParams().set('bookId', bookId);
    return this.http.delete<void>(url, {params});
  }

  updateBook(changes: object) {
    const url = this.baseUrl + '/updateBook';
    return this.http.patch<Book>(url, changes);
  }
}
