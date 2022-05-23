import { NgModule } from "@angular/core";
import { AdminGateway } from "./admin.service";
import { CategoryGateway } from "./category.service";
import { EventGateway } from "./event.service";
import { JoinRequestGateway } from "./join-request.service";
import { MetricGateway } from "./metric.service";
import { PermissionGateway } from "./permission.service";
import { RolesGateway } from "./roles.service";
import { UserGateway } from "./user.service";

@NgModule({
  providers: [
    PermissionGateway,
    RolesGateway,
    UserGateway,
    AdminGateway,
    JoinRequestGateway,
    MetricGateway,
    EventGateway,
    CategoryGateway,
  ],
})
export class GatewayModule {}
