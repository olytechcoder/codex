import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { FlightController } from "../flight.controller";
import { FlightService } from "../flight.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  airline: "exampleAirline",
  createdAt: new Date(),
  destinationAirport: "exampleDestinationAirport",
  flightNumber: "exampleFlightNumber",
  id: "exampleId",
  originAirport: "exampleOriginAirport",
  scheduledArrival: new Date(),
  scheduledDeparture: new Date(),
  status: "exampleStatus",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  airline: "exampleAirline",
  createdAt: new Date(),
  destinationAirport: "exampleDestinationAirport",
  flightNumber: "exampleFlightNumber",
  id: "exampleId",
  originAirport: "exampleOriginAirport",
  scheduledArrival: new Date(),
  scheduledDeparture: new Date(),
  status: "exampleStatus",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    airline: "exampleAirline",
    createdAt: new Date(),
    destinationAirport: "exampleDestinationAirport",
    flightNumber: "exampleFlightNumber",
    id: "exampleId",
    originAirport: "exampleOriginAirport",
    scheduledArrival: new Date(),
    scheduledDeparture: new Date(),
    status: "exampleStatus",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  airline: "exampleAirline",
  createdAt: new Date(),
  destinationAirport: "exampleDestinationAirport",
  flightNumber: "exampleFlightNumber",
  id: "exampleId",
  originAirport: "exampleOriginAirport",
  scheduledArrival: new Date(),
  scheduledDeparture: new Date(),
  status: "exampleStatus",
  updatedAt: new Date(),
};

const service = {
  createFlight() {
    return CREATE_RESULT;
  },
  flights: () => FIND_MANY_RESULT,
  flight: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("Flight", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: FlightService,
          useValue: service,
        },
      ],
      controllers: [FlightController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /flights", async () => {
    await request(app.getHttpServer())
      .post("/flights")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        scheduledArrival: CREATE_RESULT.scheduledArrival.toISOString(),
        scheduledDeparture: CREATE_RESULT.scheduledDeparture.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /flights", async () => {
    await request(app.getHttpServer())
      .get("/flights")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          scheduledArrival: FIND_MANY_RESULT[0].scheduledArrival.toISOString(),
          scheduledDeparture:
            FIND_MANY_RESULT[0].scheduledDeparture.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /flights/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/flights"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /flights/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/flights"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        scheduledArrival: FIND_ONE_RESULT.scheduledArrival.toISOString(),
        scheduledDeparture: FIND_ONE_RESULT.scheduledDeparture.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /flights existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/flights")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        scheduledArrival: CREATE_RESULT.scheduledArrival.toISOString(),
        scheduledDeparture: CREATE_RESULT.scheduledDeparture.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/flights")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
