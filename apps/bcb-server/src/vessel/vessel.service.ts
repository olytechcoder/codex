import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { VesselServiceBase } from "./base/vessel.service.base";

@Injectable()
export class VesselService extends VesselServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
