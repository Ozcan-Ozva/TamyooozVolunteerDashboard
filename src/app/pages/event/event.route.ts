import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventManagementComponent } from "./event-management/event-management.component";
import { EventReportComponent } from "./event-report/event-report.component";
import { EventComponent } from "./events-view/event.component";

const routes: Routes = [
    {
        path: '',
        component: EventComponent,
    },
    {
        path: 'manage-event/:id', //this should have the event id.
        component: EventManagementComponent,
    },
    {
        path: 'event-report', //this should have the event id.
        component: EventReportComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EventRouting {}
