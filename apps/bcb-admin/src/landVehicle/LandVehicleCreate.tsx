import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  DateTimeInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";

import { GoodsDeclarationTitle } from "../goodsDeclaration/GoodsDeclarationTitle";
import { PersonTitle } from "../person/PersonTitle";

export const LandVehicleCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="entryPoint" source="entryPoint" />
        <DateTimeInput label="entryTime" source="entryTime" />
        <ReferenceArrayInput
          source="goodsDeclarations"
          reference="GoodsDeclaration"
        >
          <SelectArrayInput
            optionText={GoodsDeclarationTitle}
            parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
            format={(value: any) => value && value.map((v: any) => v.id)}
          />
        </ReferenceArrayInput>
        <TextInput label="nationality" source="nationality" />
        <TextInput label="ownerName" source="ownerName" />
        <ReferenceArrayInput source="people" reference="Person">
          <SelectArrayInput
            optionText={PersonTitle}
            parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
            format={(value: any) => value && value.map((v: any) => v.id)}
          />
        </ReferenceArrayInput>
        <TextInput label="plateNumber" source="plateNumber" />
        <TextInput label="status" source="status" />
        <TextInput label="vehicleType" source="vehicleType" />
      </SimpleForm>
    </Create>
  );
};
