import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Checkout } from 'src/app/models/checkout';
import { Page } from 'src/app/models/page';
import { CheckoutService } from 'src/app/services/checkout.service';
import { PageRequest,SortDirection } from 'src/app/models/page';

@Component({
  selector: 'app-checkouts',
  templateUrl: './checkouts.component.html',
  styleUrls: ['./checkouts.component.scss']
})
export class CheckoutsComponent implements OnInit {

  checkouts$!: Observable<Page<Checkout>>
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
    private checkoutService: CheckoutService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['view'] === 'list') {
        this.formVisibility = false;
      }
      this.getCheckouts();
    })

  }

  getCheckouts() {
    this.checkouts$! = this.checkoutService.getCheckouts(this.pageRequest);
    this.checkouts$.subscribe(page => this.totalPages = page.totalPages);
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
    this.getCheckouts();
    this.getTotalPages();
   }
  prevPage() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {page: --this.pageRequest.pageIndex},
      queryParamsHandling: 'merge'
     })
     this.getCheckouts();
     this.getTotalPages();
    
  }

  

  showForm() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {view: 'form'},
      queryParamsHandling: 'merge'
    }
    )
    this.formVisibility = true;
  }


  getTotalPages() {
    this.checkouts$.subscribe(page => this.totalPages = page.totalPages);
  }
}
