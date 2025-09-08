import { Flight } from "../flight/Flight";
import { Passenger } from "../passenger/Passenger";

export type SecurityCheck = {
  checkTime: Date | null;
  cleared: boolean | null;
  createdAt: Date;
  documentVerified: boolean | null;
  flight?: Flight | null;
  id: string;
  luggageScanResult: string | null;
  officerName: string | null;
  passenger?: Passenger | null;
  updatedAt: Date;
};
