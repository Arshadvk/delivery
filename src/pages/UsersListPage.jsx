import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UsersListLayer from "../components/UsersListLayer";


const UsersListPage = ({ title , user}) => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title={title}/>

        {/* UsersListLayer */}
        <UsersListLayer user={user} />

      </MasterLayout>

    </>
  );
};

export default UsersListPage; 
