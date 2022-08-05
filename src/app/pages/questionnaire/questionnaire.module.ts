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
import { QuestionnaireComponent } from './questionnaire.component';
import { ShowQuestionsDialogComponent } from './components/show-questions-dialog/show-questions-dialog.component';
import { VolunteerAnwserQuestionnaierComponent } from './components/volunteer-anwser-questionnaier/volunteer-anwser-questionnaier.component';
import { SendQuestionnaireDialogComponent } from './components/send-questionnaire-dialog/send-questionnaire-dialog.component';

@NgModule({
    declarations: [
        QuestionnaireComponent,
        ShowQuestionsDialogComponent,
        VolunteerAnwserQuestionnaierComponent,
        SendQuestionnaireDialogComponent
    ],
    exports: [],
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
export class QyestionnaireViewModule {}
