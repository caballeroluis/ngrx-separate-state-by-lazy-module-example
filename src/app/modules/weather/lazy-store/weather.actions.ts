import { createAction, props } from '@ngrx/store';
import { WeatherData } from '../models/weather.model';

export const loadWeatherData = createAction('[Weather] Load Weather Data');

export const setWeatherData = createAction(
    '[Weather] Set Weather Data',
    props<{ weatherData: WeatherData }>()
);