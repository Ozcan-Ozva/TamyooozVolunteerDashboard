import { CategoryComponent } from "./../../pages/category/category.component";
import { VolunteersComponent } from "./../../pages/volunteers/volunteers.component";
import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { RoleAndPermissionComponent } from "../../pages/role-and-permission/role-and-permission.component";
import { JoinOrgRequestComponent } from "../../pages/join-org-request/join-org-request.component";
import { MetricComponent } from "../../pages/metric/metric.component";
import { PointRuleComponent } from "../../pages/point-rule/point-rule.component";
import { BadgetComponent } from "../../pages/badget/badget.component";
import { NewsFeedComponent } from "../../pages/news-feed/news-feed.component";
import { MessagesComponent } from "../../pages/messages/messages.component";
import { LevelComponent } from "../../pages/level/level.component";
import { LeaderboardComponent } from "../../pages/leaderboard/leaderboard.component";
import { InventoriesComponent } from "../../pages/inventories/inventories.component";
import { QuestionnaireComponent } from "../../pages/questionnaire/questionnaire.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "role-and-permission", component: RoleAndPermissionComponent },
  { path: "point-rule", component: PointRuleComponent },
  { path: "badge", component: BadgetComponent },
  { path: "join-request", component: JoinOrgRequestComponent },
  { path: "messages", component: MessagesComponent },
  { path: "metric", component: MetricComponent },
  { path: "news-feed", component: NewsFeedComponent },
  { path: "levels", component: LevelComponent },
  { path: "leaderboards", component: LeaderboardComponent },
  { path: "inventories", component: InventoriesComponent },
  {
    path: "event",
    loadChildren: () =>
      import("../../pages/event/event.module").then(
        (module) => module.EventViewModule
      ),
  },
  { path: "category", component: CategoryComponent },
  { path: "volunteers", component: VolunteersComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "questionnaire", component: QuestionnaireComponent },
];
