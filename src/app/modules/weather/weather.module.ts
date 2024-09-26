import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';
import { FormsModule } from '@angular/forms';
import { WeatherEffects } from './lazy-store/weather.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { weatherReducer } from './lazy-store/weather.reducer';

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forFeature('weather', weatherReducer),
    EffectsModule.forFeature([WeatherEffects]),
  ],
  providers: [WeatherService],
})
export class WeatherModule {}
