import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SecurityCheckServiceBase } from "./base/securityCheck.service.base";

@Injectable()
export class SecurityCheckService extends SecurityCheckServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
