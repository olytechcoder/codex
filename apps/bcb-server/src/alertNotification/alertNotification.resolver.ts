import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AlertNotificationResolverBase } from "./base/alertNotification.resolver.base";
import { AlertNotification } from "./base/AlertNotification";
import { AlertNotificationService } from "./alertNotification.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => AlertNotification)
export class AlertNotificationResolver extends AlertNotificationResolverBase {
  constructor(
    protected readonly service: AlertNotificationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
