import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { VesselModuleBase } from "./base/vessel.module.base";
import { VesselService } from "./vessel.service";
import { VesselController } from "./vessel.controller";
import { VesselResolver } from "./vessel.resolver";

@Module({
  imports: [VesselModuleBase, forwardRef(() => AuthModule)],
  controllers: [VesselController],
  providers: [VesselService, VesselResolver],
  exports: [VesselService],
})
export class VesselModule {}
