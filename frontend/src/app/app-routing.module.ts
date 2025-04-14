import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { CheckoutsComponent } from './components/checkouts/checkouts.component';
import { CheckoutDetailComponent } from './components/checkout-detail/checkout-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AddCheckoutComponent } from './components/add-checkout/add-checkout.component';

const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: BooksListComponent},
  {path: 'books/:id', component: BookDetailComponent},
  {path: 'checkouts', component: CheckoutsComponent},
  {path: 'checkouts/:id', component: CheckoutDetailComponent},
  {path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
