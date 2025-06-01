import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditAdminLayer from "../components/EditAdminLayer";


const EditAdminPage = ({ user}) => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title={"Edit Admin"} />

        {/* AddUserLayer */}
        <EditAdminLayer user={user}/>


      </MasterLayout>
    </>
  );
};

export default EditAdminPage;
