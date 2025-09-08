import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { SecurityCheckModuleBase } from "./base/securityCheck.module.base";
import { SecurityCheckService } from "./securityCheck.service";
import { SecurityCheckController } from "./securityCheck.controller";
import { SecurityCheckResolver } from "./securityCheck.resolver";

@Module({
  imports: [SecurityCheckModuleBase, forwardRef(() => AuthModule)],
  controllers: [SecurityCheckController],
  providers: [SecurityCheckService, SecurityCheckResolver],
  exports: [SecurityCheckService],
})
export class SecurityCheckModule {}
