import { PassengerWhereInput } from "./PassengerWhereInput";
import { PassengerOrderByInput } from "./PassengerOrderByInput";

export type PassengerFindManyArgs = {
  where?: PassengerWhereInput;
  orderBy?: Array<PassengerOrderByInput>;
  skip?: number;
  take?: number;
};
