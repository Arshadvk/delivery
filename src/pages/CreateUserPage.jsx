import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import CreateUserLayer from "../components/CreateUserLayer";

const CreateUserPage = ({title }) => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title={title} />

        {/* AddUserLayer */}
        <CreateUserLayer/>


      </MasterLayout>
    </>
  );
};

export default CreateUserPage;
