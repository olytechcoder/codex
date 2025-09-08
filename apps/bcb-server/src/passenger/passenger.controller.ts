import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PassengerService } from "./passenger.service";
import { PassengerControllerBase } from "./base/passenger.controller.base";

@swagger.ApiTags("passengers")
@common.Controller("passengers")
export class PassengerController extends PassengerControllerBase {
  constructor(
    protected readonly service: PassengerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
