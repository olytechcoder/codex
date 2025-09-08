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
import { VesselController } from "../vessel.controller";
import { VesselService } from "../vessel.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  arrivalTime: new Date(),
  createdAt: new Date(),
  departureTime: new Date(),
  destinationPort: "exampleDestinationPort",
  id: "exampleId",
  name: "exampleName",
  nationality: "exampleNationality",
  portOfOrigin: "examplePortOfOrigin",
  status: "exampleStatus",
  typeField: "exampleTypeField",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  arrivalTime: new Date(),
  createdAt: new Date(),
  departureTime: new Date(),
  destinationPort: "exampleDestinationPort",
  id: "exampleId",
  name: "exampleName",
  nationality: "exampleNationality",
  portOfOrigin: "examplePortOfOrigin",
  status: "exampleStatus",
  typeField: "exampleTypeField",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    arrivalTime: new Date(),
    createdAt: new Date(),
    departureTime: new Date(),
    destinationPort: "exampleDestinationPort",
    id: "exampleId",
    name: "exampleName",
    nationality: "exampleNationality",
    portOfOrigin: "examplePortOfOrigin",
    status: "exampleStatus",
    typeField: "exampleTypeField",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  arrivalTime: new Date(),
  createdAt: new Date(),
  departureTime: new Date(),
  destinationPort: "exampleDestinationPort",
  id: "exampleId",
  name: "exampleName",
  nationality: "exampleNationality",
  portOfOrigin: "examplePortOfOrigin",
  status: "exampleStatus",
  typeField: "exampleTypeField",
  updatedAt: new Date(),
};

const service = {
  createVessel() {
    return CREATE_RESULT;
  },
  vessels: () => FIND_MANY_RESULT,
  vessel: ({ where }: { where: { id: string } }) => {
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

describe("Vessel", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: VesselService,
          useValue: service,
        },
      ],
      controllers: [VesselController],
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

  test("POST /vessels", async () => {
    await request(app.getHttpServer())
      .post("/vessels")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        arrivalTime: CREATE_RESULT.arrivalTime.toISOString(),
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        departureTime: CREATE_RESULT.departureTime.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /vessels", async () => {
    await request(app.getHttpServer())
      .get("/vessels")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          arrivalTime: FIND_MANY_RESULT[0].arrivalTime.toISOString(),
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          departureTime: FIND_MANY_RESULT[0].departureTime.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /vessels/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/vessels"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /vessels/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/vessels"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        arrivalTime: FIND_ONE_RESULT.arrivalTime.toISOString(),
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        departureTime: FIND_ONE_RESULT.departureTime.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /vessels existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/vessels")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        arrivalTime: CREATE_RESULT.arrivalTime.toISOString(),
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        departureTime: CREATE_RESULT.departureTime.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/vessels")
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
