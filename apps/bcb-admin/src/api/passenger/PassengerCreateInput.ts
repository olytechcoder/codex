import { FlightWhereUniqueInput } from "../flight/FlightWhereUniqueInput";
import { SecurityCheckCreateNestedManyWithoutPassengersInput } from "./SecurityCheckCreateNestedManyWithoutPassengersInput";

export type PassengerCreateInput = {
  boardingPassId?: string | null;
  firstName?: string | null;
  flight?: FlightWhereUniqueInput | null;
  lastName?: string | null;
  nationality?: string | null;
  passportNumber?: string | null;
  seatNumber?: string | null;
  securityChecks?: SecurityCheckCreateNestedManyWithoutPassengersInput;
  visaStatus?: string | null;
};
