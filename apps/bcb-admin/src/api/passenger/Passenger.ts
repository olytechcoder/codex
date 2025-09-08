import { Flight } from "../flight/Flight";
import { SecurityCheck } from "../securityCheck/SecurityCheck";

export type Passenger = {
  boardingPassId: string | null;
  createdAt: Date;
  firstName: string | null;
  flight?: Flight | null;
  id: string;
  lastName: string | null;
  nationality: string | null;
  passportNumber: string | null;
  seatNumber: string | null;
  securityChecks?: Array<SecurityCheck>;
  updatedAt: Date;
  visaStatus: string | null;
};
