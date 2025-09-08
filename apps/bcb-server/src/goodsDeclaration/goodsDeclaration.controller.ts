import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { GoodsDeclarationService } from "./goodsDeclaration.service";
import { GoodsDeclarationControllerBase } from "./base/goodsDeclaration.controller.base";

@swagger.ApiTags("goodsDeclarations")
@common.Controller("goodsDeclarations")
export class GoodsDeclarationController extends GoodsDeclarationControllerBase {
  constructor(
    protected readonly service: GoodsDeclarationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
