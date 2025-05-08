import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { distinctUntilKeyChanged, Observable } from 'rxjs';
import { Checkout } from 'src/app/models/checkout';
import { CheckoutService } from 'src/app/services/checkout.service';
import { PageRequest,SortDirection } from 'src/app/models/page';

@Component({
  selector: 'app-checkouts',
  templateUrl: './checkouts.component.html',
  styleUrls: ['./checkouts.component.scss']
})
export class CheckoutsComponent implements OnInit {

  checkouts: Checkout[] = [];
  formVisibility: boolean = false;
  freeTextQuery: string = "";
  currentPage: number = 0;
  totalPages: number = 0;

  pageSizes: number[] = [10, 20, 30];
  sortDirections: SortDirection[] = ['desc', 'asc'];
  
  sorting = [
    {label: "Book", value: "borrowedBook"},
    {label: "Checkout Date", value: "checkedOutDate"},
    {label: "Due Date", value: "dueDate"},
    {label: "Return Date", value: "returnedDate"}
  ]

  pageRequest: PageRequest = {
    pageIndex: 0,
    pageSize: 20,
    sort: 'borrowedBook',
    direction: 'asc'
  }
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(distinctUntilKeyChanged('view')).subscribe(params => {
      if(params['view'] === 'form') {
        this.formVisibility = true;
      } else {
        this.formVisibility = false;
        this.getCheckouts();
      }
    })
  }

  getCheckouts() {
    this.checkoutService.getCheckouts(this.pageRequest).subscribe(pageOfCheckouts => {
      this.checkouts = pageOfCheckouts.content;
      this.totalPages = pageOfCheckouts.totalPages;
      this.currentPage = pageOfCheckouts.number
    });
  }

  getCheckoutsByTitleContains() {
    this.checkoutService.getCheckoutsContaining(this.freeTextQuery, this.pageRequest).subscribe(pageOfCheckouts => {
       this.totalPages = pageOfCheckouts.totalPages;
       this.checkouts = pageOfCheckouts.content;
      });
  }

  nextPage() {
    this.pageRequest.pageIndex++;
    this.getCheckouts();
   }
  prevPage() {
    this.pageRequest.pageIndex--;
     this.getCheckouts();
  }

  showForm() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {view: 'form'},
      queryParamsHandling: 'merge'
    }
    )
  }
}
