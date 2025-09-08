import { CargoManifestWhereInput } from "./CargoManifestWhereInput";
import { CargoManifestOrderByInput } from "./CargoManifestOrderByInput";

export type CargoManifestFindManyArgs = {
  where?: CargoManifestWhereInput;
  orderBy?: Array<CargoManifestOrderByInput>;
  skip?: number;
  take?: number;
};
