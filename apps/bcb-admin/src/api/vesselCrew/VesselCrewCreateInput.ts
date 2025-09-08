import { VesselWhereUniqueInput } from "../vessel/VesselWhereUniqueInput";

export type VesselCrewCreateInput = {
  firstName?: string | null;
  lastName?: string | null;
  nationality?: string | null;
  passportNumber?: string | null;
  role?: string | null;
  vessel?: VesselWhereUniqueInput | null;
  visaStatus?: string | null;
};
