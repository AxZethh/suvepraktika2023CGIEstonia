import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Checkout } from 'src/app/models/checkout';
import { Page } from 'src/app/models/page';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkouts',
  templateUrl: './checkouts.component.html',
  styleUrls: ['./checkouts.component.scss']
})
export class CheckoutsComponent implements OnInit {

  checkouts$!: Observable<Page<Checkout>>
  formVisibility: boolean = false;
  currentPage: number = 0;
  size: number = 20;
  pageSizes: number[] = [10, 20, 30];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private checkoutService: CheckoutService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.handleQueryParams(params));

    this.getCheckouts();
  }

  getCheckouts() {
    this.checkouts$! = this.checkoutService.getCheckouts({
      pageIndex: this.currentPage, pageSize: this.size
    })
  }

  nextPage() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: ++this.currentPage, size: this.size },
      queryParamsHandling: 'merge'
    })

    this.getCheckouts();
  }
  prevPage() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: --this.currentPage, size: this.size },
      queryParamsHandling: 'merge'
    })

    this.getCheckouts();
  }

  handleQueryParams(params: Params) {
      if(params['view'] === 'list') {
        this.formVisibility = false;
      }
      this.currentPage = params['page'] || 0;
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
}
