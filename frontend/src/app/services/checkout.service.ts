import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PageRequest, Page } from '../models/page';
import { Observable } from 'rxjs';
import { Checkout } from '../models/checkout';
import { RestUtil } from './rest-util';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private readonly baseUrl = environment.backendUrl + "/api/checkout";

  constructor(private http: HttpClient) 
  {}

  getCheckouts(filter: Partial<PageRequest>): Observable<Page<Checkout>> {
    const url = this.baseUrl + "/getCheckouts";
    const params = RestUtil.buildParamsFromPageRequest(filter);
    return this.http.get<Page<Checkout>>(url, {params});
  }

  getCheckout(checkOutId: string): Observable<Checkout> {
    const url = this.baseUrl + "/getCheckout";
    const params = new HttpParams().set('checkOutId', checkOutId);
    return this.http.get<Checkout>(url, {params});
  }

  saveCheckout(checkout: Checkout): Observable<string> {
    const url = this.baseUrl + "/addCheckout";
    return this.http.post<string>(url, checkout);
  }

  deleteCheckout(checkOutId: string): Observable<string> {
    const url = this.baseUrl + "/deleteCheckout";
    const params = new HttpParams().set('checkOutId', checkOutId);
    return this.http.delete<string>(url, {params, responseType: 'text' as 'json'});
  }
}
