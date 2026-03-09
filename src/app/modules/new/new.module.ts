import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';
import { newReducer } from './lazy-store/new.reducer';

@NgModule({
  declarations: [
    NewComponent
  ],
  imports: [
    CommonModule,
    NewRoutingModule,
    StoreModule.forFeature('new', newReducer)
  ]
})
export class NewModule { }
