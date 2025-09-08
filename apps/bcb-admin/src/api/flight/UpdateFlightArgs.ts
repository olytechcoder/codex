import { FlightWhereUniqueInput } from "./FlightWhereUniqueInput";
import { FlightUpdateInput } from "./FlightUpdateInput";

export type UpdateFlightArgs = {
  where: FlightWhereUniqueInput;
  data: FlightUpdateInput;
};
