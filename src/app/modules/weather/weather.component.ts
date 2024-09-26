import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectWeatherData } from './lazy-store/weather.selectors';
import { loadWeatherData } from './lazy-store/weather.actions';
import { WeatherData } from './models/weather.model';

@Component({
  selector: 'app-weather',
  styleUrls: ['./weather.component.css'],
  templateUrl: './weather.component.html',
})
export class WeatherComponent implements OnInit {
  weatherData$: Observable<WeatherData | null> = this.store.pipe(select(selectWeatherData));

  constructor(private store: Store) {}
  
  ngOnInit(): void {
    this.store.dispatch(loadWeatherData());
  }
}
