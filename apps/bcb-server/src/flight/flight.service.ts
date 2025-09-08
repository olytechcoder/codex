import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { FlightServiceBase } from "./base/flight.service.base";

@Injectable()
export class FlightService extends FlightServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
