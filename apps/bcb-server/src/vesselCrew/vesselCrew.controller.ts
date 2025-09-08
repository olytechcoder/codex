import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { VesselCrewService } from "./vesselCrew.service";
import { VesselCrewControllerBase } from "./base/vesselCrew.controller.base";

@swagger.ApiTags("vesselCrews")
@common.Controller("vesselCrews")
export class VesselCrewController extends VesselCrewControllerBase {
  constructor(
    protected readonly service: VesselCrewService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
