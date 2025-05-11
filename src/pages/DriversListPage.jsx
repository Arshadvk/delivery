import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import DriversListLayer from "../components/DriversListLayer";


const DriversListPage = ({ user}) => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title={"Drivers List" }/>

        {/* UsersListLayer */}
        <DriversListLayer user={user} />

      </MasterLayout>

    </>
  );
};

export default DriversListPage; 
