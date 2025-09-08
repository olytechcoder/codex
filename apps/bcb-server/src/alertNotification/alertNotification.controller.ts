import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { AlertNotificationService } from "./alertNotification.service";
import { AlertNotificationControllerBase } from "./base/alertNotification.controller.base";

@swagger.ApiTags("alertNotifications")
@common.Controller("alertNotifications")
export class AlertNotificationController extends AlertNotificationControllerBase {
  constructor(
    protected readonly service: AlertNotificationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
