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
import { JoinOrgRequestComponent } from './join-org-request.component';
import { CreateJoinRequestComponent } from './components/create-join-request/create-join-request.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { JoinRequestGateway } from '../../services/gateways/join-request.service';

@NgModule({
    declarations: [JoinOrgRequestComponent, CreateJoinRequestComponent],
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
export class JoinOrgRequestViewModule {}
