import { FlightWhereUniqueInput } from "../flight/FlightWhereUniqueInput";
import { PassengerWhereUniqueInput } from "../passenger/PassengerWhereUniqueInput";

export type SecurityCheckCreateInput = {
  checkTime?: Date | null;
  cleared?: boolean | null;
  documentVerified?: boolean | null;
  flight?: FlightWhereUniqueInput | null;
  luggageScanResult?: string | null;
  officerName?: string | null;
  passenger?: PassengerWhereUniqueInput | null;
};
