import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RolesAndPermissionsViewModule } from '../../pages/role-and-permission/role-and-permission.module';
import { JoinOrgRequestViewModule } from '../../pages/join-org-request/join-org-request.module';
import { MetricViewModule } from '../../pages/metric/metric.module';
import { EventViewModule } from '../../pages/event/event.module';
import { VolunteersViewModule } from '../../pages/volunteers/volunteers.module';
import { CategoryViewModule } from '../../pages/category/category.module';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    RolesAndPermissionsViewModule,
    JoinOrgRequestViewModule,
    MetricViewModule,
    EventViewModule,
    VolunteersViewModule,
    CategoryViewModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent
  ]
})

export class AdminLayoutModule {}
