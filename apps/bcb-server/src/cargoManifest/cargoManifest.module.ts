import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CargoManifestModuleBase } from "./base/cargoManifest.module.base";
import { CargoManifestService } from "./cargoManifest.service";
import { CargoManifestController } from "./cargoManifest.controller";
import { CargoManifestResolver } from "./cargoManifest.resolver";

@Module({
  imports: [CargoManifestModuleBase, forwardRef(() => AuthModule)],
  controllers: [CargoManifestController],
  providers: [CargoManifestService, CargoManifestResolver],
  exports: [CargoManifestService],
})
export class CargoManifestModule {}
