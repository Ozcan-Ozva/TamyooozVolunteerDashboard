import { LevelComponent } from './level.component';
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
import { CreateLevelDialogComponent } from './components/create-level-dialog/create-level-dialog.component';
import { ObtainLevelComponent } from './components/obtain-level/obtain-level.component';

@NgModule({
    declarations: [LevelComponent, CreateLevelDialogComponent, ObtainLevelComponent],
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
    ],
})
export class LevelViewModule {}
