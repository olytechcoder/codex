import { VesselWhereInput } from "./VesselWhereInput";
import { VesselOrderByInput } from "./VesselOrderByInput";

export type VesselFindManyArgs = {
  where?: VesselWhereInput;
  orderBy?: Array<VesselOrderByInput>;
  skip?: number;
  take?: number;
};
