import { Lead } from './../../types/lead';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { LeadService } from "../services/lead.service";

import { getLeadsFailed } from "./lead.actions";
import { getLeadsSuccess } from "./lead.actions";
import { LeadActions } from "./lead.actions";

@Injectable()
export class LeadEffects {
  constructor(private actions$: Actions,
              private leadService: LeadService) { }

  public getLeads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeadActions.getLeads),
      switchMap(() =>
        this.leadService.fetchLeads().pipe(
          map((results: Lead[]) => getLeadsSuccess({ results })),
          catchError((error: any) => of(getLeadsFailed({ error })))
        )
      )
    )
  );

}
