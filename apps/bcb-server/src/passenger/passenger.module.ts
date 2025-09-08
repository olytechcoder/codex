import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PassengerModuleBase } from "./base/passenger.module.base";
import { PassengerService } from "./passenger.service";
import { PassengerController } from "./passenger.controller";
import { PassengerResolver } from "./passenger.resolver";

@Module({
  imports: [PassengerModuleBase, forwardRef(() => AuthModule)],
  controllers: [PassengerController],
  providers: [PassengerService, PassengerResolver],
  exports: [PassengerService],
})
export class PassengerModule {}
