import { AlertNotificationWhereInput } from "./AlertNotificationWhereInput";
import { AlertNotificationOrderByInput } from "./AlertNotificationOrderByInput";

export type AlertNotificationFindManyArgs = {
  where?: AlertNotificationWhereInput;
  orderBy?: Array<AlertNotificationOrderByInput>;
  skip?: number;
  take?: number;
};
