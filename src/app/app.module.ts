import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './modules/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //importado biblioteca
import { HttpClientModule } from "@angular/common/http" //importado biblioteca
import { CookieService } from 'ngx-cookie-service';

//IMPORTANDO BIBLIOTECA PRIMENG
import { MessageService } from 'primeng/api';
import { CardModule } from "primeng/card"
import { InputTextModule } from "primeng/inputtext"
import { ButtonModule } from "primeng/button"
import { ToastModule } from "primeng/toast"

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
    HttpClientModule, //adicionando biblioteca
    //PRIMENG IMPORTAÇOES
    CardModule, //CARD CADASTRA INFORMAÇOES DOS FORMULARIOS
    InputTextModule, // INPUT PARA INSERIR DADOS LOGIN CRIAÇÃO DE USUARIO
    ButtonModule, //BOTOES
    ToastModule //NOTIFICAÇOES PARA USUARIO DE LOGIN EFETUADO OU FALHA
  ],
  providers: [CookieService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
