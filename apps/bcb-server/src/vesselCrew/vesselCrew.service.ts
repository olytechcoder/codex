import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { VesselCrewServiceBase } from "./base/vesselCrew.service.base";

@Injectable()
export class VesselCrewService extends VesselCrewServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
