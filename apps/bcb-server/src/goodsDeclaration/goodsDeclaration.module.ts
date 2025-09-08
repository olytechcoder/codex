import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { GoodsDeclarationModuleBase } from "./base/goodsDeclaration.module.base";
import { GoodsDeclarationService } from "./goodsDeclaration.service";
import { GoodsDeclarationController } from "./goodsDeclaration.controller";
import { GoodsDeclarationResolver } from "./goodsDeclaration.resolver";

@Module({
  imports: [GoodsDeclarationModuleBase, forwardRef(() => AuthModule)],
  controllers: [GoodsDeclarationController],
  providers: [GoodsDeclarationService, GoodsDeclarationResolver],
  exports: [GoodsDeclarationService],
})
export class GoodsDeclarationModule {}
