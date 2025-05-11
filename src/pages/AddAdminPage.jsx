import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddUserLayer from "../components/AddUserLayer";
import AddAdminLayer from "../components/AddAdminLayer";


const AddAdminPage = ({title , user}) => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title={title} />

        {/* AddUserLayer */}
        <AddAdminLayer user={user}/>


      </MasterLayout>
    </>
  );
};

export default AddAdminPage;
