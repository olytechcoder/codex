import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { LandVehicleModuleBase } from "./base/landVehicle.module.base";
import { LandVehicleService } from "./landVehicle.service";
import { LandVehicleController } from "./landVehicle.controller";
import { LandVehicleResolver } from "./landVehicle.resolver";

@Module({
  imports: [LandVehicleModuleBase, forwardRef(() => AuthModule)],
  controllers: [LandVehicleController],
  providers: [LandVehicleService, LandVehicleResolver],
  exports: [LandVehicleService],
})
export class LandVehicleModule {}
