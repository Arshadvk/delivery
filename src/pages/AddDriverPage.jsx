import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddDriverLayer from "../components/AddDriverLayer";



const AddDriverPage = ({title , user}) => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title={title} />

        {/* AddUserLayer */}
        <AddDriverLayer user={user}/>


      </MasterLayout>
    </>
  );
};

export default AddDriverPage;
