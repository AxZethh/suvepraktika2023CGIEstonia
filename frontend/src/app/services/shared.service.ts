import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  formVisibilityForBook: boolean = false;
  formVisibilityForCheckout: boolean = false;


  if(formVisibilityForBook = true) {
    formVisibilityForBook = false;
  }
}
