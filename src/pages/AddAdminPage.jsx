import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddUserLayer from "../components/AddUserLayer";
import AddAdminLayer from "../components/AddAdminLayer";


const AddAdminPage = ({ user}) => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title={"Add Admins"} />

        {/* AddUserLayer */}
        <AddAdminLayer user={user}/>


      </MasterLayout>
    </>
  );
};

export default AddAdminPage;
