import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { FlightModuleBase } from "./base/flight.module.base";
import { FlightService } from "./flight.service";
import { FlightController } from "./flight.controller";
import { FlightResolver } from "./flight.resolver";

@Module({
  imports: [FlightModuleBase, forwardRef(() => AuthModule)],
  controllers: [FlightController],
  providers: [FlightService, FlightResolver],
  exports: [FlightService],
})
export class FlightModule {}
