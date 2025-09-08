import { FlightWhereInput } from "./FlightWhereInput";
import { FlightOrderByInput } from "./FlightOrderByInput";

export type FlightFindManyArgs = {
  where?: FlightWhereInput;
  orderBy?: Array<FlightOrderByInput>;
  skip?: number;
  take?: number;
};
