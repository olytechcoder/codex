import { FlightWhereUniqueInput } from "../flight/FlightWhereUniqueInput";
import { SecurityCheckUpdateManyWithoutPassengersInput } from "./SecurityCheckUpdateManyWithoutPassengersInput";

export type PassengerUpdateInput = {
  boardingPassId?: string | null;
  firstName?: string | null;
  flight?: FlightWhereUniqueInput | null;
  lastName?: string | null;
  nationality?: string | null;
  passportNumber?: string | null;
  seatNumber?: string | null;
  securityChecks?: SecurityCheckUpdateManyWithoutPassengersInput;
  visaStatus?: string | null;
};
