import { SortOrder } from "../../util/SortOrder";

export type AlertNotificationOrderByInput = {
  actionRequired?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  message?: SortOrder;
  moduleField?: SortOrder;
  severity?: SortOrder;
  status?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
};
