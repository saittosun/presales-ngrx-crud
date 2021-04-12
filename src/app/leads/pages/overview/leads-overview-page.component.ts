import { Observable } from 'rxjs';
import { selectLeads } from './../../store/lead.selector';
import { loadLeads } from './../../store/lead.actions';
import { LeadState } from './../../store/lead.reducer';
import { select, Store } from '@ngrx/store';
import { Lead } from '~types/lead';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { LeadFacade } from '../../services/lead.facade';
import { LeadService } from '../../services/lead.service';
import { LeadsOverviewPageDataSource } from './leads-overview-page-datasource';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-leads-overview-page',
  templateUrl: './leads-overview-page.component.html',
  styleUrls: ['./leads-overview-page.component.scss']
})
export class LeadsOverviewPageComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Lead>;
  dataSource: LeadsOverviewPageDataSource;

  displayedColumns = ['project', 'customer', 'status', 'detail'];
  // leads$: Observable<Lead[]>

  constructor(private store: Store<LeadState>) {
    this.dataSource = new LeadsOverviewPageDataSource(store);
  }

  ngOnInit(): void {
    // this.store.getLeads().subscribe(leads => {
    //   if(leads.length === 0) {
    //     this.leadService.fetchLeads().subscribe(leads => {
    //       this.store.setLeads(leads);
    //     })
    //   }
    // })
    this.store.dispatch(loadLeads());
    this.loadLeads();
    console.log(this.dataSource);
  }

  loadLeads() {
    this.store.pipe(select(selectLeads))
    // console.log(this.leads$);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
