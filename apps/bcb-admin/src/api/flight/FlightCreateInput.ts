import { PassengerCreateNestedManyWithoutFlightsInput } from "./PassengerCreateNestedManyWithoutFlightsInput";
import { SecurityCheckCreateNestedManyWithoutFlightsInput } from "./SecurityCheckCreateNestedManyWithoutFlightsInput";

export type FlightCreateInput = {
  airline?: string | null;
  destinationAirport?: string | null;
  flightNumber?: string | null;
  originAirport?: string | null;
  passengers?: PassengerCreateNestedManyWithoutFlightsInput;
  scheduledArrival?: Date | null;
  scheduledDeparture?: Date | null;
  securityChecks?: SecurityCheckCreateNestedManyWithoutFlightsInput;
  status?: string | null;
};
