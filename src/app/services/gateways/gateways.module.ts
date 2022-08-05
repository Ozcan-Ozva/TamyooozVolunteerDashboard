import { NgModule } from "@angular/core";
import { AdminGateway } from "./admin.service";
import { BadgeGateway } from "./badge.service";
import { CategoryGateway } from "./category.service";
import { EventGateway } from "./event.service";
import { InventoriesGateway } from "./inventories.service";
import { JoinRequestGateway } from "./join-request.service";
import { LeaderboardGateway } from "./leaderboard.service";
import { LevelGateway } from "./level.service";
import { MetricGateway } from "./metric.service";
import { PermissionGateway } from "./permission.service";
import { PointRuleGateway } from "./point-rule.service";
import { QuestionnaireGateway } from "./questionnaire.serivce";
import { RolesGateway } from "./roles.service";
import { UserGateway } from "./user.service";

@NgModule({
  providers: [
    PermissionGateway,
    RolesGateway,
    UserGateway,
    AdminGateway,
    PointRuleGateway,
    JoinRequestGateway,
    BadgeGateway,
    MetricGateway,
    EventGateway,
    CategoryGateway,
    LevelGateway,
    LeaderboardGateway,
    InventoriesGateway,
    QuestionnaireGateway,
  ],
})
export class GatewayModule {}
