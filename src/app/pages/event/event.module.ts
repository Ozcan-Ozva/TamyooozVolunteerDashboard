import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { CarouselImageComponent } from './components/carousel-image/carousel-image.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { EventComponent } from './events-view/event.component';
import { EventRouting } from './event.route';
import { EventStateComponent } from './components/event-state/event-state.component';
import { AddVolunteerComponent } from './components/add-volunteer/add-volunteer.component';
import { ListDialogComponent } from './components/list-dialog/list-dialog.component';
import { EventReportComponent } from './event-report/event-report.component';

import {MatTabsModule} from '@angular/material/tabs';
import { MetricDialogComponent } from './components/metric-dialog/metric-dialog.component';

@NgModule({
    declarations: [EventReportComponent, EventComponent, CreateEventComponent, EventManagementComponent, CarouselImageComponent, EventStateComponent, AddVolunteerComponent, ListDialogComponent],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        DragDropModule,
        MatButtonModule,
        MatInputModule,
        OverlayModule,
        MatFormFieldModule,
        FormsModule,
        MatDialogModule,
        NgbModule,
        EventRouting,
        MatTabsModule
    ],
})
export class EventViewModule {}
