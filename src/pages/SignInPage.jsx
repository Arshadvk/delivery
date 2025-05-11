import React, { useEffect, useState } from "react";
import SignInLayer from "../components/SignInLayer";
import { Navigate } from "react-router-dom";

const SignInPage = () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setRedirect(true);
    }
  }, []);

  if (redirect) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      {/* SignInLayer */}
      <SignInLayer />
    </>
  );
};

export default SignInPage;
