import { NgModule } from "@angular/core";
import { AdminGateway } from "./admin.service";
import { BadgeGateway } from "./badge.service";
import { CategoryGateway } from "./category.service";
import { EventGateway } from "./event.service";
import { JoinRequestGateway } from "./join-request.service";
import { LevelGateway } from "./level.service";
import { MetricGateway } from "./metric.service";
import { PermissionGateway } from "./permission.service";
import { PointRuleGateway } from "./point-rule.service";
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
  ],
})
export class GatewayModule {}
