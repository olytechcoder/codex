import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  DateTimeInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";

import { FlightTitle } from "../flight/FlightTitle";
import { PassengerTitle } from "../passenger/PassengerTitle";

export const SecurityCheckCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <DateTimeInput label="checkTime" source="checkTime" />
        <BooleanInput label="cleared" source="cleared" />
        <BooleanInput label="documentVerified" source="documentVerified" />
        <ReferenceInput source="flight.id" reference="Flight" label="Flight">
          <SelectInput optionText={FlightTitle} />
        </ReferenceInput>
        <TextInput label="luggageScanResult" source="luggageScanResult" />
        <TextInput label="officerName" source="officerName" />
        <ReferenceInput
          source="passenger.id"
          reference="Passenger"
          label="Passenger"
        >
          <SelectInput optionText={PassengerTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
