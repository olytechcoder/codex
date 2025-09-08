import { Module } from "@nestjs/common";
import { VesselCrewModule } from "./vesselCrew/vesselCrew.module";
import { GoodsDeclarationModule } from "./goodsDeclaration/goodsDeclaration.module";
import { CargoManifestModule } from "./cargoManifest/cargoManifest.module";
import { AlertNotificationModule } from "./alertNotification/alertNotification.module";
import { RoleModule } from "./role/role.module";
import { VesselModule } from "./vessel/vessel.module";
import { FlightModule } from "./flight/flight.module";
import { PersonModule } from "./person/person.module";
import { LandVehicleModule } from "./landVehicle/landVehicle.module";
import { PassengerModule } from "./passenger/passenger.module";
import { SecurityCheckModule } from "./securityCheck/securityCheck.module";
import { UserModule } from "./user/user.module";
import { HealthModule } from "./health/health.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SecretsManagerModule } from "./providers/secrets/secretsManager.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  controllers: [],
  imports: [
    ACLModule,
    AuthModule,
    VesselCrewModule,
    GoodsDeclarationModule,
    CargoManifestModule,
    AlertNotificationModule,
    RoleModule,
    VesselModule,
    FlightModule,
    PersonModule,
    LandVehicleModule,
    PassengerModule,
    SecurityCheckModule,
    UserModule,
    HealthModule,
    PrismaModule,
    SecretsManagerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: "schema.graphql",
          sortSchema: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule {}
