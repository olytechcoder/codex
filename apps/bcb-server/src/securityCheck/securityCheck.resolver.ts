import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { SecurityCheckResolverBase } from "./base/securityCheck.resolver.base";
import { SecurityCheck } from "./base/SecurityCheck";
import { SecurityCheckService } from "./securityCheck.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => SecurityCheck)
export class SecurityCheckResolver extends SecurityCheckResolverBase {
  constructor(
    protected readonly service: SecurityCheckService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
