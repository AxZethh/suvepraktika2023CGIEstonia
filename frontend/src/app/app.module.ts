import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CheckoutsComponent } from './components/checkouts/checkouts.component';
import { CheckoutDetailComponent } from './components/checkout-detail/checkout-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AddCheckoutComponent } from './components/add-checkout/add-checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './services/auth/interceptor/auth.interceptor';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailComponent,
    CheckoutsComponent,
    CheckoutDetailComponent,
    NotFoundComponent,
    AddBookComponent,
    AddCheckoutComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
