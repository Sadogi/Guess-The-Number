import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbDatepickerModule, NbListModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NavComponent } from './components/nav/nav.component';
import { RandomNumberComponent } from './components/random-number/random-number.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberApiService } from './services/number-api.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RandomNumberComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule.forRoot(),
    HttpClientModule,
    NbListModule,
    NbToastrModule.forRoot()
  ],
  providers: [
    NumberApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
