import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-add-checkout',
  templateUrl: './add-checkout.component.html',
  styleUrls: ['./add-checkout.component.scss']
})
export class AddCheckoutComponent{

addCheckoutForm!: FormGroup;

constructor(
  //private checkoutService: CheckoutService,
  ){}

// ngOnInit() {
//   this.addCheckoutForm = new FormGroup({
//     "borrowerFirstName": new FormControl("", Validators.required),
//     "borrowerLastName": new FormControl("", Validators.required),
//     "borrowedBook": new FormControl("", Validators.required),
//     "dueDate": new FormControl("", Validators.required),
//   })
// }



// addCheckout() {
//   const formToSend = this.addCheckoutForm.value
//   const formattedDueDate = new Date(formToSend.dueDate).toISOString().split('T')[0];
//   const checkout: Checkout = {
//     ...formToSend,
//     "dueDate": formattedDueDate,
//   }
//   console.log(formToSend.borrowedBook);
  
//   this.checkoutService.saveCheckout(checkout.borrowedBook).subscribe({
//     next: (response) => console.log("New Checkouts ID: " + response),
//     error: (err) => console.log("Error Occured While adding Checkout!", err)
//   })
// }

}
