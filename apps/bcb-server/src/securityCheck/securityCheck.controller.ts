import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SecurityCheckService } from "./securityCheck.service";
import { SecurityCheckControllerBase } from "./base/securityCheck.controller.base";

@swagger.ApiTags("securityChecks")
@common.Controller("securityChecks")
export class SecurityCheckController extends SecurityCheckControllerBase {
  constructor(
    protected readonly service: SecurityCheckService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
