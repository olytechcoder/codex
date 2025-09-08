import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { AlertNotificationModuleBase } from "./base/alertNotification.module.base";
import { AlertNotificationService } from "./alertNotification.service";
import { AlertNotificationController } from "./alertNotification.controller";
import { AlertNotificationResolver } from "./alertNotification.resolver";

@Module({
  imports: [AlertNotificationModuleBase, forwardRef(() => AuthModule)],
  controllers: [AlertNotificationController],
  providers: [AlertNotificationService, AlertNotificationResolver],
  exports: [AlertNotificationService],
})
export class AlertNotificationModule {}
