import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PersonModuleBase } from "./base/person.module.base";
import { PersonService } from "./person.service";
import { PersonController } from "./person.controller";
import { PersonResolver } from "./person.resolver";

@Module({
  imports: [PersonModuleBase, forwardRef(() => AuthModule)],
  controllers: [PersonController],
  providers: [PersonService, PersonResolver],
  exports: [PersonService],
})
export class PersonModule {}
