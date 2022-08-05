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
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BadgetComponent } from './badget.component';
import { CreateBadgeComponent } from './components/create-badge/create-badge.component';
import { MetricQueryCardComponent } from './components/metric-query-card/metric-query-card.component';
import { BadgeLeaderboardComponent } from './components/badge-leaderboard/badge-leaderboard.component';
import { BadgeComponent } from './components/badge/badge.component';

@NgModule({
    declarations: [BadgetComponent, CreateBadgeComponent, MetricQueryCardComponent, BadgeLeaderboardComponent, BadgeComponent],
    exports: [
        MetricQueryCardComponent,
        BadgeLeaderboardComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MatNativeDateModule,
        DragDropModule,
        MatDatepickerModule,
        MatButtonModule,
        MatInputModule,
        OverlayModule,
        MatFormFieldModule,
        FormsModule,
        MatDialogModule,
        NgbModule,
    ],
})
export class BadgeViewModule {}
