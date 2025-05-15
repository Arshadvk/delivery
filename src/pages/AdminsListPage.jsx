import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AdminsListLayer from "../components/AdminsListLayer";


const AdminsListPage = ({user}) => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title={"Admins Management"}/>

        {/* UsersListLayer */}
        <AdminsListLayer user={user} />

      </MasterLayout>

    </>
  );
};

export default AdminsListPage; 
