import { FlightWhereInput } from "./FlightWhereInput";

export type FlightListRelationFilter = {
  every?: FlightWhereInput;
  some?: FlightWhereInput;
  none?: FlightWhereInput;
};
