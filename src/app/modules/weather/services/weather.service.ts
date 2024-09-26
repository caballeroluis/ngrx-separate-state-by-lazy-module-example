import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/weather.model';

@Injectable()
export class WeatherService {
  private weatherUrl = 'assets/mock/weather-data.json';

  constructor(private http: HttpClient) {}

  getWeatherData(): Observable<any> {
    return this.http.get<WeatherData>(this.weatherUrl);
  }
}