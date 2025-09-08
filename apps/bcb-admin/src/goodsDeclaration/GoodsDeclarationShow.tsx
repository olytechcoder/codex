import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceField,
} from "react-admin";
import { LANDVEHICLE_TITLE_FIELD } from "../landVehicle/LandVehicleTitle";

export const GoodsDeclarationShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="customsStatus" source="customsStatus" />
        <TextField label="declarationNumber" source="declarationNumber" />
        <TextField label="description" source="description" />
        <TextField label="ID" source="id" />
        <ReferenceField
          label="LandVehicle"
          source="landvehicle.id"
          reference="LandVehicle"
        >
          <TextField source={LANDVEHICLE_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="ownerName" source="ownerName" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="value" source="value" />
      </SimpleShowLayout>
    </Show>
  );
};
