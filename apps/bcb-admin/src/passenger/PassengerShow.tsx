import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
  ReferenceField,
  ReferenceManyField,
  Datagrid,
  BooleanField,
} from "react-admin";

import { FLIGHT_TITLE_FIELD } from "../flight/FlightTitle";
import { PASSENGER_TITLE_FIELD } from "./PassengerTitle";

export const PassengerShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
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
        <TextField label="visaStatus" source="visaStatus" />
        <ReferenceManyField
          reference="SecurityCheck"
          target="passengerId"
          label="SecurityChecks"
        >
          <Datagrid rowClick="show" bulkActionButtons={false}>
            <TextField label="checkTime" source="checkTime" />
            <BooleanField label="cleared" source="cleared" />
            <DateField source="createdAt" label="Created At" />
            <BooleanField label="documentVerified" source="documentVerified" />
            <ReferenceField
              label="Flight"
              source="flight.id"
              reference="Flight"
            >
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
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
