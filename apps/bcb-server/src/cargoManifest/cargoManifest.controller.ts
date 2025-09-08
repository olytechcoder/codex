import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CargoManifestService } from "./cargoManifest.service";
import { CargoManifestControllerBase } from "./base/cargoManifest.controller.base";

@swagger.ApiTags("cargoManifests")
@common.Controller("cargoManifests")
export class CargoManifestController extends CargoManifestControllerBase {
  constructor(
    protected readonly service: CargoManifestService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
