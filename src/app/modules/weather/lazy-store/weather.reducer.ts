import { createReducer, on, Action } from '@ngrx/store';
import * as WeatherActions from './weather.actions';
import { WeatherData } from '../models/weather.model';

export interface WeatherState {
  data: WeatherData | null;
}

export const initialState: WeatherState = {
  data: null,
};

const _weatherReducer = createReducer(
  initialState,
  on(WeatherActions.setWeatherData, (state: WeatherState, { weatherData }) => ({
    ...state,
    data: weatherData,
  }))
);

export function weatherReducer(state: WeatherState | undefined, action: Action) {
  return _weatherReducer(state, action);
}
