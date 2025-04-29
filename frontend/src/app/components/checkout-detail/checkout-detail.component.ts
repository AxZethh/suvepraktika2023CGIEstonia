import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Checkout } from 'src/app/models/checkout';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html',
  styleUrls: ['./checkout-detail.component.scss'],
})
export class CheckoutDetailComponent implements OnInit{

  
  checkout$!:  Observable<Checkout>;
  protected deletionSuccess!: boolean;
  message: string = "";
  
  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
  ) {}

  

  ngOnInit() {
    this.checkout$ = this.route.params
    .pipe(map(params => params['id']))
    .pipe(switchMap(id => this.checkoutService.getCheckout(id)))
  }

  deleteCheckout() {
    this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.checkoutService.deleteCheckout(id))).subscribe({
        next: (response) => {
          this.deletionSuccess = true;
          this.message = response;
        },  
        error: (error) => console.log('Error deleting Checkout', error)
      });
      
  }
}
