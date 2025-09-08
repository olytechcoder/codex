import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { GoodsDeclarationResolverBase } from "./base/goodsDeclaration.resolver.base";
import { GoodsDeclaration } from "./base/GoodsDeclaration";
import { GoodsDeclarationService } from "./goodsDeclaration.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => GoodsDeclaration)
export class GoodsDeclarationResolver extends GoodsDeclarationResolverBase {
  constructor(
    protected readonly service: GoodsDeclarationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
