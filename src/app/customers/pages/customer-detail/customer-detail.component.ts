import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Customer } from '~types/customer';
import { CustomerFacade } from '~customers/services/customer.facade';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailPageComponent implements OnInit {
  private destroyed$ = new Subject<boolean>();
  customers: Customer[];
  customer: Customer;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // combineLatest(
    //   this.store.getCustomers(),
    //   this.route.params
    // ).pipe(
    //   takeUntil(this.destroyed$)
    // ).subscribe(([customers, params]) => {
    //   this.store.findCustomer(params.id).subscribe(customer => this.customer = customer)
    // })
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}

