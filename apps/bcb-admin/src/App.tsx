import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import dataProvider from "./data-provider/graphqlDataProvider";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { VesselCrewList } from "./vesselCrew/VesselCrewList";
import { VesselCrewCreate } from "./vesselCrew/VesselCrewCreate";
import { VesselCrewEdit } from "./vesselCrew/VesselCrewEdit";
import { VesselCrewShow } from "./vesselCrew/VesselCrewShow";
import { GoodsDeclarationList } from "./goodsDeclaration/GoodsDeclarationList";
import { GoodsDeclarationCreate } from "./goodsDeclaration/GoodsDeclarationCreate";
import { GoodsDeclarationEdit } from "./goodsDeclaration/GoodsDeclarationEdit";
import { GoodsDeclarationShow } from "./goodsDeclaration/GoodsDeclarationShow";
import { CargoManifestList } from "./cargoManifest/CargoManifestList";
import { CargoManifestCreate } from "./cargoManifest/CargoManifestCreate";
import { CargoManifestEdit } from "./cargoManifest/CargoManifestEdit";
import { CargoManifestShow } from "./cargoManifest/CargoManifestShow";
import { AlertNotificationList } from "./alertNotification/AlertNotificationList";
import { AlertNotificationCreate } from "./alertNotification/AlertNotificationCreate";
import { AlertNotificationEdit } from "./alertNotification/AlertNotificationEdit";
import { AlertNotificationShow } from "./alertNotification/AlertNotificationShow";
import { RoleList } from "./role/RoleList";
import { RoleCreate } from "./role/RoleCreate";
import { RoleEdit } from "./role/RoleEdit";
import { RoleShow } from "./role/RoleShow";
import { VesselList } from "./vessel/VesselList";
import { VesselCreate } from "./vessel/VesselCreate";
import { VesselEdit } from "./vessel/VesselEdit";
import { VesselShow } from "./vessel/VesselShow";
import { FlightList } from "./flight/FlightList";
import { FlightCreate } from "./flight/FlightCreate";
import { FlightEdit } from "./flight/FlightEdit";
import { FlightShow } from "./flight/FlightShow";
import { PersonList } from "./person/PersonList";
import { PersonCreate } from "./person/PersonCreate";
import { PersonEdit } from "./person/PersonEdit";
import { PersonShow } from "./person/PersonShow";
import { LandVehicleList } from "./landVehicle/LandVehicleList";
import { LandVehicleCreate } from "./landVehicle/LandVehicleCreate";
import { LandVehicleEdit } from "./landVehicle/LandVehicleEdit";
import { LandVehicleShow } from "./landVehicle/LandVehicleShow";
import { PassengerList } from "./passenger/PassengerList";
import { PassengerCreate } from "./passenger/PassengerCreate";
import { PassengerEdit } from "./passenger/PassengerEdit";
import { PassengerShow } from "./passenger/PassengerShow";
import { SecurityCheckList } from "./securityCheck/SecurityCheckList";
import { SecurityCheckCreate } from "./securityCheck/SecurityCheckCreate";
import { SecurityCheckEdit } from "./securityCheck/SecurityCheckEdit";
import { SecurityCheckShow } from "./securityCheck/SecurityCheckShow";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { jwtAuthProvider } from "./auth-provider/ra-auth-jwt";

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <Admin
        title={"bcb"}
        dataProvider={dataProvider}
        authProvider={jwtAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="VesselCrew"
          list={VesselCrewList}
          edit={VesselCrewEdit}
          create={VesselCrewCreate}
          show={VesselCrewShow}
        />
        <Resource
          name="GoodsDeclaration"
          list={GoodsDeclarationList}
          edit={GoodsDeclarationEdit}
          create={GoodsDeclarationCreate}
          show={GoodsDeclarationShow}
        />
        <Resource
          name="CargoManifest"
          list={CargoManifestList}
          edit={CargoManifestEdit}
          create={CargoManifestCreate}
          show={CargoManifestShow}
        />
        <Resource
          name="AlertNotification"
          list={AlertNotificationList}
          edit={AlertNotificationEdit}
          create={AlertNotificationCreate}
          show={AlertNotificationShow}
        />
        <Resource
          name="Role"
          list={RoleList}
          edit={RoleEdit}
          create={RoleCreate}
          show={RoleShow}
        />
        <Resource
          name="Vessel"
          list={VesselList}
          edit={VesselEdit}
          create={VesselCreate}
          show={VesselShow}
        />
        <Resource
          name="Flight"
          list={FlightList}
          edit={FlightEdit}
          create={FlightCreate}
          show={FlightShow}
        />
        <Resource
          name="Person"
          list={PersonList}
          edit={PersonEdit}
          create={PersonCreate}
          show={PersonShow}
        />
        <Resource
          name="LandVehicle"
          list={LandVehicleList}
          edit={LandVehicleEdit}
          create={LandVehicleCreate}
          show={LandVehicleShow}
        />
        <Resource
          name="Passenger"
          list={PassengerList}
          edit={PassengerEdit}
          create={PassengerCreate}
          show={PassengerShow}
        />
        <Resource
          name="SecurityCheck"
          list={SecurityCheckList}
          edit={SecurityCheckEdit}
          create={SecurityCheckCreate}
          show={SecurityCheckShow}
        />
        <Resource
          name="User"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          show={UserShow}
        />
      </Admin>
    </div>
  );
};

export default App;
