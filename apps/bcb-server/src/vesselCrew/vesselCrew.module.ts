import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { VesselCrewModuleBase } from "./base/vesselCrew.module.base";
import { VesselCrewService } from "./vesselCrew.service";
import { VesselCrewController } from "./vesselCrew.controller";
import { VesselCrewResolver } from "./vesselCrew.resolver";

@Module({
  imports: [VesselCrewModuleBase, forwardRef(() => AuthModule)],
  controllers: [VesselCrewController],
  providers: [VesselCrewService, VesselCrewResolver],
  exports: [VesselCrewService],
})
export class VesselCrewModule {}
