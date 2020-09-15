import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { RandomNumberComponent } from './components/random-number/random-number.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'number', component: RandomNumberComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
