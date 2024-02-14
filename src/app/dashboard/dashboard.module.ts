import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashborad.route';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

//importação do primeng
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    //importaçao do primeng

    SidebarModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    ToastModule,
  ],
  providers: [MessageService,CookieService]
})
export class DashboardModule { }
