import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PassengerServiceBase } from "./base/passenger.service.base";

@Injectable()
export class PassengerService extends PassengerServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
