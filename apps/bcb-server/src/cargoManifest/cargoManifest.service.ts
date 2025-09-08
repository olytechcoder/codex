import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CargoManifestServiceBase } from "./base/cargoManifest.service.base";

@Injectable()
export class CargoManifestService extends CargoManifestServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
