import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AlertNotificationServiceBase } from "./base/alertNotification.service.base";

@Injectable()
export class AlertNotificationService extends AlertNotificationServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
