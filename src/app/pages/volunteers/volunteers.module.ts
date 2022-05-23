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
import { VolunteersComponent } from './volunteers.component';
import { UserVolunteersComponent } from './components/user-volunteers/user-volunteers.component';
import { AdminVolunteersComponent } from './components/admin-volunteers/admin-volunteers.component';

@NgModule({
    declarations: [VolunteersComponent, UserVolunteersComponent, AdminVolunteersComponent],
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
export class VolunteersViewModule {}
