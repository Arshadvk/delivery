import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditAdminLayer from "../components/EditAdminLayer";
import EditDriverLayer from "../components/EditDriverLayer";


const EditDriverPage = ({ user}) => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title={"Edit Driver"} />

        {/* AddUserLayer */}
        <EditDriverLayer />


      </MasterLayout>
    </>
  );
};

export default EditDriverPage;
