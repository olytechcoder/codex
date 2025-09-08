import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { VesselCrewResolverBase } from "./base/vesselCrew.resolver.base";
import { VesselCrew } from "./base/VesselCrew";
import { VesselCrewService } from "./vesselCrew.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => VesselCrew)
export class VesselCrewResolver extends VesselCrewResolverBase {
  constructor(
    protected readonly service: VesselCrewService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
