export interface Temperature {
    current: number;
    unit: string;
  }
  
  export interface Forecast {
    day: string;
    temperature: {
      high: number;
      low: number;
    };
    condition: string;
  }
  
  export interface WeatherData {
    location: string;
    temperature: Temperature;
    condition: string;
    forecast: Forecast[];
  }
  