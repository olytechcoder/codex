import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  DateTimeInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";

import { FlightTitle } from "../flight/FlightTitle";
import { PassengerTitle } from "../passenger/PassengerTitle";

export const SecurityCheckEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
