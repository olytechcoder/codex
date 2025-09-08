import * as React from "react";

import {
  List,
  Datagrid,
  ListProps,
  TextField,
  BooleanField,
  DateField,
  ReferenceField,
} from "react-admin";

import Pagination from "../Components/Pagination";
import { FLIGHT_TITLE_FIELD } from "../flight/FlightTitle";
import { PASSENGER_TITLE_FIELD } from "../passenger/PassengerTitle";

export const SecurityCheckList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      title={"SecurityChecks"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField label="checkTime" source="checkTime" />
        <BooleanField label="cleared" source="cleared" />
        <DateField source="createdAt" label="Created At" />
        <BooleanField label="documentVerified" source="documentVerified" />
        <ReferenceField label="Flight" source="flight.id" reference="Flight">
          <TextField source={FLIGHT_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="ID" source="id" />
        <TextField label="luggageScanResult" source="luggageScanResult" />
        <TextField label="officerName" source="officerName" />
        <ReferenceField
          label="Passenger"
          source="passenger.id"
          reference="Passenger"
        >
          <TextField source={PASSENGER_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="Updated At" />{" "}
      </Datagrid>
    </List>
  );
};
