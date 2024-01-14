import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //importado biblioteca
import { HttpClientModule } from "@angular/common/http" //importado biblioteca

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './modules/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, //adicionando biblioteca
    ReactiveFormsModule, //adicionando biblioteca
    HttpClientModule //adicionando biblioteca
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
