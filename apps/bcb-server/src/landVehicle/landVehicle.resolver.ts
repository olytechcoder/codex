import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { LandVehicleResolverBase } from "./base/landVehicle.resolver.base";
import { LandVehicle } from "./base/LandVehicle";
import { LandVehicleService } from "./landVehicle.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => LandVehicle)
export class LandVehicleResolver extends LandVehicleResolverBase {
  constructor(
    protected readonly service: LandVehicleService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
