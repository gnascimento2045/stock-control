import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { DASHBOARD_ROUTES } from './dashborad.route';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToolbarNavigationComponent } from 'src/app/shared/components/toolbar-navigation/toolbar-navigation.component';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';

//importação do primeng
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [DashboardHomeComponent],
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
    ChartModule,
    //Shared
    SharedModule
  ],
  exports: [ToolbarNavigationComponent],
  providers: [MessageService,CookieService]
})
export class DashboardModule { }
