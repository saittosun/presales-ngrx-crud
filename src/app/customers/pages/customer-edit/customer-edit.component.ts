import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerFacade } from '~customers/services/customer.facade';
import { Countries } from '~types/countries';
import { Country } from '~types/country';
import { Customer } from '~types/customer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditPageComponent implements OnInit {
  customers: Customer[];
  customer: Customer;
  id: number;
  leadForm: FormGroup;
  editted: boolean = false;
  countries: Country[] = new Countries().countries;
  private destroyed$ = new Subject<boolean>();

  constructor(private route: ActivatedRoute,
              private store: CustomerFacade) { }

  ngOnInit(): void {
    combineLatest(
      this.store.getCustomers(),
      this.route.params
    ).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(([customers, params]) => {
      this.store.findCustomer(params.id).subscribe(customer => this.customer = customer)
    })
    this.createForm();
  }

  private createForm() {
    this.leadForm = new FormGroup({
      customername: new FormControl(this.customer.customername, Validators.required),
      addressline1: new FormControl(this.customer.address.addressline1, Validators.required),
      addressline2: new FormControl(this.customer.address.addressline2),
      country: new FormControl(this.customer.address.country, Validators.required),
      city: new FormControl(this.customer.address.city, Validators.required),
      state: new FormControl(this.customer.address.state, Validators.required),
      zip: new FormControl(this.customer.address.zip, Validators.required),
      vat: new FormControl(this.customer.vat, Validators.required),
      firstname: new FormControl(this.customer.firstname, Validators.required),
      lastname: new FormControl(this.customer.lastname, Validators.required),
      email: new FormControl(this.customer.email, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      phonenumber: new FormControl(this.customer.phonenumber, [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern("^[0-9]*$"),
      ]),
    })
  }

  onEditForm() {
    this.editted = true;
    if (this.leadForm.invalid) {
      alert('You must fill the required fields!')
      return;
    };
    this.customer = {
      customername: this.leadForm.value.customername,
      address : {
        addressline1: this.leadForm.value.addressline1,
        addressline2: this.leadForm.value.addressline2,
        city: this.leadForm.value.city,
        country: this.leadForm.value.country,
        state: this.leadForm.value.state,
        zip: this.leadForm.value.zip
      },
      vat: this.leadForm.value.vat,
      firstname: this.leadForm.value.firstname,
      lastname: this.leadForm.value.lastname,
      phonenumber: this.leadForm.value.phonenumber,
      email: this.leadForm.value.email,
      projectname: this.leadForm.value.projectname || 'Renson',
      date: this.leadForm.value.date || 'end of november',
      id: null,
      status: this.leadForm.value.status || 'pitch'
    }
    this.store.updateCustomer(this.id, this.customer)
    this.leadForm.reset()
    this.editted = false;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}

