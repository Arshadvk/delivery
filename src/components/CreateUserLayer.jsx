import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

const CreateUserLayer = () => {
  const [isShowPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const showPassword = () => {
    setShowPassword(!isShowPassword);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
  const form = e.target;
    const formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch("https://logistics.nicheperfumery.ae/user/create-customer", {
        method: "POST",
        body: formData,
      });

     
      const result = await response.json();
      console.log(result)
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your account has been created successfully.",
      });

      // Optionally reset the form
      form.reset();
    
    } catch (error) {
      console.log("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while submitting the form.",
      });
    }finally {
      setLoading(false);
    }
  
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-body p-24">
        <div className="row justify-content-center">
          <div className="col-xxl-6 col-xl-8 col-lg-10">
            <div className="card border">
              <div className="card-body">
                <form onSubmit={handleSubmit}>

                <div className="mb-20">
                    <label
                      htmlFor="name"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                     Company Name
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="name"
                      name="companyName"
                      placeholder="Enter Full Name"
                    />
                
                  </div>

                  <div className="mb-20">
                    <label
                      htmlFor="name"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                     Contact Person Name 
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="name"
                      name="contactPersonName"
                      placeholder="Enter Full Name"
                    />
                    <input
                      type="text"
                      hidden
                      className="form-control radius-8"
                      id="isVerified"
                      name="isVerified"
                      required
                      value={true} />
                  </div>

                  <div className="mb-20">
                    <label
                      htmlFor="name"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                     Contact Number
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="name"
                      name="contactNumber"
                      placeholder="Enter Full Name"
                    />
                    <input
                      type="text"
                      hidden
                      className="form-control radius-8"
                      id="isVerified"
                      name="isVerified"
                      required
                      value={true} />
                  </div>

                  <div className="mb-20">
                    <label
                      htmlFor="email"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Email 
                    </label>
                    <input
                      type="email"
                      className="form-control radius-8"
                      id="email"
                      name="email"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="mb-20">
                    <label
                      htmlFor="email"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Registration No 
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      name="registrationNumber"
                      placeholder="Enter email address"
                    />
                  </div>
                

                  <div className="mb-20">
                    <label
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Trade License 
                    </label>
                    <input
                      type="file"
                      className="form-control radius-8"
                      name="tradeLicense"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="mb-20">
                    <label
                      htmlFor="email"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Vat Certificate 
                    </label>
                    <input
                      type="file"
                      className="form-control radius-8"
                      name="vatCertificate"
                      placeholder="Enter email address"
                    />
                  </div>

                  
                 
                  <label
                    htmlFor="password"
                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                  >
                    Password 
                  </label>

                  <div className="position-relative mb-20">
                    <div>
                      <input
                        type={isShowPassword ? "text" : "password"}
                        name="password"
                        className="form-control radius-8"
                        id="your-password"
                        placeholder="Password"
                      />
                    </div>
                    <span
                      onClick={showPassword}
                      className={`toggle-password ${isShowPassword ? "ri-eye-off-fill" : "ri-eye-line"
                        } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                    />
                  </div>

                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <button
                      type="button"
                      className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                      disabled={loading}
                    >
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : null}
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserLayer;
