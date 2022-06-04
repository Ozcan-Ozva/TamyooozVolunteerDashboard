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
import { CreateRoleComponent } from './components/create-role/create-role.component';
import { RoleAndPermissionComponent } from './role-and-permission.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HasRoleCardComponent } from './components/has-role-card/has-role-card.component';

@NgModule({
    declarations: [CreateRoleComponent,RoleAndPermissionComponent, HasRoleCardComponent],
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
export class RolesAndPermissionsViewModule {}
