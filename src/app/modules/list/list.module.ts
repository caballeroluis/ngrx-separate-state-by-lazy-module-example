import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { HttpClientModule } from '@angular/common/http';
import { ListService } from './services/list.service';
import { FormsModule } from '@angular/forms';
import { ListEffects } from './lazy-store/list.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { listReducer } from './lazy-store/list.reducer';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forFeature('list', listReducer),
    EffectsModule.forFeature([ListEffects]),
  ],
  providers: [ListService],
})
export class ListModule {}
