import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { CargoManifestResolverBase } from "./base/cargoManifest.resolver.base";
import { CargoManifest } from "./base/CargoManifest";
import { CargoManifestService } from "./cargoManifest.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => CargoManifest)
export class CargoManifestResolver extends CargoManifestResolverBase {
  constructor(
    protected readonly service: CargoManifestService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
