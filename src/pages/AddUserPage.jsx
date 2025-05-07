import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddUserLayer from "../components/AddUserLayer";


const AddUserPage = ({title , user}) => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title={title} />

        {/* AddUserLayer */}
        <AddUserLayer user={user}/>


      </MasterLayout>
    </>
  );
};

export default AddUserPage;
