import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LandVehicleService } from "./landVehicle.service";
import { LandVehicleControllerBase } from "./base/landVehicle.controller.base";

@swagger.ApiTags("landVehicles")
@common.Controller("landVehicles")
export class LandVehicleController extends LandVehicleControllerBase {
  constructor(
    protected readonly service: LandVehicleService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
