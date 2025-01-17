import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.reducer';

export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

export const selectWeatherData = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.data
);
