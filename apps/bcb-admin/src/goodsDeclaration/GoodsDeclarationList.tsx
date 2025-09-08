import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  DateField,
  TextField,
  ReferenceField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { LANDVEHICLE_TITLE_FIELD } from "../landVehicle/LandVehicleTitle";

export const GoodsDeclarationList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      title={"GoodsDeclarations"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
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
        <TextField label="value" source="value" />{" "}
      </Datagrid>
    </List>
  );
};
