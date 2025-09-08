import { LandVehicleWhereInput } from "./LandVehicleWhereInput";
import { LandVehicleOrderByInput } from "./LandVehicleOrderByInput";

export type LandVehicleFindManyArgs = {
  where?: LandVehicleWhereInput;
  orderBy?: Array<LandVehicleOrderByInput>;
  skip?: number;
  take?: number;
};
