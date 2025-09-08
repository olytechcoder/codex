import { VesselCrewWhereInput } from "./VesselCrewWhereInput";
import { VesselCrewOrderByInput } from "./VesselCrewOrderByInput";

export type VesselCrewFindManyArgs = {
  where?: VesselCrewWhereInput;
  orderBy?: Array<VesselCrewOrderByInput>;
  skip?: number;
  take?: number;
};
