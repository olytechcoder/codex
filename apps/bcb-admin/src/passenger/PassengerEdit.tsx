import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";

import { FlightTitle } from "../flight/FlightTitle";
import { SecurityCheckTitle } from "../securityCheck/SecurityCheckTitle";

export const PassengerEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="boardingPassId" source="boardingPassId" />
        <TextInput label="firstName" source="firstName" />
        <ReferenceInput source="flight.id" reference="Flight" label="Flight">
          <SelectInput optionText={FlightTitle} />
        </ReferenceInput>
        <TextInput label="lastName" source="lastName" />
        <TextInput label="nationality" source="nationality" />
        <TextInput label="passportNumber" source="passportNumber" />
        <TextInput label="seatNumber" source="seatNumber" />
        <ReferenceArrayInput source="securityChecks" reference="SecurityCheck">
          <SelectArrayInput
            optionText={SecurityCheckTitle}
            parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
            format={(value: any) => value && value.map((v: any) => v.id)}
          />
        </ReferenceArrayInput>
        <TextInput label="visaStatus" source="visaStatus" />
      </SimpleForm>
    </Edit>
  );
};
