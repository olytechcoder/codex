import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  TextField,
  DateField,
  ReferenceField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { FLIGHT_TITLE_FIELD } from "../flight/FlightTitle";

export const PassengerList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      title={"Passengers"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField label="boardingPassId" source="boardingPassId" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="firstName" source="firstName" />
        <ReferenceField label="Flight" source="flight.id" reference="Flight">
          <TextField source={FLIGHT_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="ID" source="id" />
        <TextField label="lastName" source="lastName" />
        <TextField label="nationality" source="nationality" />
        <TextField label="passportNumber" source="passportNumber" />
        <TextField label="seatNumber" source="seatNumber" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="visaStatus" source="visaStatus" />{" "}
      </Datagrid>
    </List>
  );
};
