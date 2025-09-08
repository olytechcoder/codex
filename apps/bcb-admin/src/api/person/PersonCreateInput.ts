import { LandVehicleWhereUniqueInput } from "../landVehicle/LandVehicleWhereUniqueInput";

export type PersonCreateInput = {
  firstName?: string | null;
  idNumber?: string | null;
  landVehicle?: LandVehicleWhereUniqueInput | null;
  lastName?: string | null;
  nationality?: string | null;
  passportNumber?: string | null;
  visaStatus?: string | null;
};
