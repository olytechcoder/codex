import { SortOrder } from "../../util/SortOrder";

export type GoodsDeclarationOrderByInput = {
  createdAt?: SortOrder;
  customsStatus?: SortOrder;
  declarationNumber?: SortOrder;
  description?: SortOrder;
  id?: SortOrder;
  landVehicleId?: SortOrder;
  ownerName?: SortOrder;
  updatedAt?: SortOrder;
  value?: SortOrder;
};
