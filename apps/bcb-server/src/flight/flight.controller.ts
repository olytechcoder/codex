import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { FlightService } from "./flight.service";
import { FlightControllerBase } from "./base/flight.controller.base";

@swagger.ApiTags("flights")
@common.Controller("flights")
export class FlightController extends FlightControllerBase {
  constructor(
    protected readonly service: FlightService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
