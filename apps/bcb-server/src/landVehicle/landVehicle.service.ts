import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LandVehicleServiceBase } from "./base/landVehicle.service.base";

@Injectable()
export class LandVehicleService extends LandVehicleServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
