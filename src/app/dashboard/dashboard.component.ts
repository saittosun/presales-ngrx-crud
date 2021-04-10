import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Customer } from '~types/customer';
import { CustomerFacade } from '~customers/services/customer.facade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  customers: Customer[];
  filteredCustomers: Customer[]
  private destroyed$ = new Subject<boolean>();

  constructor(private store: CustomerFacade) { }

  ngOnInit(): void {
    this.store.getCustomers().subscribe(customers => this.customers = customers)
    this.filteredCustomers = [...this.customers];
  }

  searchThis(val: string): void {
    if (val === null || val === '') {
      this.filteredCustomers = [...this.customers];
      return;
    }
    this.filteredCustomers = [...this.customers.filter(customer => {
      return customer.customername.toLowerCase().includes(val.toLowerCase()) || customer.projectname.toLowerCase().includes(val.toLowerCase())
    })]
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
