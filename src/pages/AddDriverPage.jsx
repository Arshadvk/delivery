import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddUserLayer from "../components/AddUserLayer";


const AddDriverPage = ({title , user}) => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title={title} />

        {/* AddUserLayer */}
        <AddDriverPage user={user}/>


      </MasterLayout>
    </>
  );
};

export default AddDriverPage;
