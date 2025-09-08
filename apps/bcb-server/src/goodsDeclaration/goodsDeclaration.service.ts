import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GoodsDeclarationServiceBase } from "./base/goodsDeclaration.service.base";

@Injectable()
export class GoodsDeclarationService extends GoodsDeclarationServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
