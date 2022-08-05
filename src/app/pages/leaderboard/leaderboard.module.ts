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
import { LeaderboardComponent } from './leaderboard.component';
import { CreateLeaderboardDialogComponent } from './components/create-leaderboard-dialog/create-leaderboard-dialog.component';
import { BadgeViewModule } from '../badget/badget.module';
import { LeaderboardVolunteersDialogComponent } from './components/leaderboard-volunteers-dialog/leaderboard-volunteers-dialog.component';

@NgModule({
    declarations: [LeaderboardComponent, CreateLeaderboardDialogComponent, LeaderboardVolunteersDialogComponent],
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
        BadgeViewModule
    ],
})
export class LeaderBoardViewModule {}
