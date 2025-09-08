import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { VesselService } from "./vessel.service";
import { VesselControllerBase } from "./base/vessel.controller.base";

@swagger.ApiTags("vessels")
@common.Controller("vessels")
export class VesselController extends VesselControllerBase {
  constructor(
    protected readonly service: VesselService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
