import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { WeatherService } from '../services/weather.service';
import * as WeatherActions from './weather.actions';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class WeatherEffects {
  constructor(private actions$: Actions, private weatherService: WeatherService) {}

  loadWeatherData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadWeatherData),
      mergeMap(() => 
        this.weatherService.getWeatherData().pipe(
          map((weatherData) => WeatherActions.setWeatherData({ weatherData }))
        )
      )
    )
  );
}
