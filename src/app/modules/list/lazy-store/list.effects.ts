import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ListService } from '../services/list.service';
import * as ListActions from './list.actions';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ListEffects {
  constructor(private actions$: Actions, private listService: ListService) {}

  loadListData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListActions.loadListData),
      mergeMap(() =>
        this.listService.getListData().pipe(
          map((listData) => ListActions.setListData({ listData }))
        )
      )
    )
  );
}
