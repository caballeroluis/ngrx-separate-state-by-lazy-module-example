import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'authentication', pathMatch: 'full' },
  { path: 'authentication', component: AuthComponent },
  {
    path: 'weather',
    loadChildren: () => import('./modules/weather/weather.module').then((m) => m.WeatherModule),
  },
  {
    path: 'list',
    loadChildren: () => import('./modules/list/list.module').then((m) => m.ListModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
