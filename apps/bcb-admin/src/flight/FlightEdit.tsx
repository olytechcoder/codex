import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
  DateTimeInput,
} from "react-admin";

import { PassengerTitle } from "../passenger/PassengerTitle";
import { SecurityCheckTitle } from "../securityCheck/SecurityCheckTitle";

export const FlightEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="airline" source="airline" />
        <TextInput label="destinationAirport" source="destinationAirport" />
        <TextInput label="flightNumber" source="flightNumber" />
        <TextInput label="originAirport" source="originAirport" />
        <ReferenceArrayInput source="passengers" reference="Passenger">
          <SelectArrayInput
            optionText={PassengerTitle}
            parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
            format={(value: any) => value && value.map((v: any) => v.id)}
          />
        </ReferenceArrayInput>
        <DateTimeInput label="scheduledArrival" source="scheduledArrival" />
        <DateTimeInput label="scheduledDeparture" source="scheduledDeparture" />
        <ReferenceArrayInput source="securityChecks" reference="SecurityCheck">
          <SelectArrayInput
            optionText={SecurityCheckTitle}
            parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
            format={(value: any) => value && value.map((v: any) => v.id)}
          />
        </ReferenceArrayInput>
        <TextInput label="status" source="status" />
      </SimpleForm>
    </Edit>
  );
};
