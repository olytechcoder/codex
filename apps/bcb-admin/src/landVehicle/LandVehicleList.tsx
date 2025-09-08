import * as React from "react";
import { List, Datagrid, ListProps, DateField, TextField } from "react-admin";
import Pagination from "../Components/Pagination";

export const LandVehicleList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      title={"LandVehicles"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <DateField source="createdAt" label="Created At" />
        <TextField label="entryPoint" source="entryPoint" />
        <TextField label="entryTime" source="entryTime" />
        <TextField label="ID" source="id" />
        <TextField label="nationality" source="nationality" />
        <TextField label="ownerName" source="ownerName" />
        <TextField label="plateNumber" source="plateNumber" />
        <TextField label="status" source="status" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="vehicleType" source="vehicleType" />{" "}
      </Datagrid>
    </List>
  );
};
