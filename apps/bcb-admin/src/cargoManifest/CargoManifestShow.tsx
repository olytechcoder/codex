import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
  ReferenceField,
} from "react-admin";
import { VESSEL_TITLE_FIELD } from "../vessel/VesselTitle";

export const CargoManifestShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="cargoDescription" source="cargoDescription" />
        <TextField label="cargoType" source="cargoType" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="manifestNumber" source="manifestNumber" />
        <TextField label="portOfDischarge" source="portOfDischarge" />
        <TextField label="portOfLoading" source="portOfLoading" />
        <TextField label="totalWeight" source="totalWeight" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceField label="Vessel" source="vessel.id" reference="Vessel">
          <TextField source={VESSEL_TITLE_FIELD} />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
};
