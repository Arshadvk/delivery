import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SignUpLayer = () => {
  const [isShowPassword, setShowPassword] = useState(false);

  const showPassword = () => {
    setShowPassword(!isShowPassword);
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      Swal.fire({
        icon: "warning",
        title: "Agreement Required",
        text: "You must agree to the Terms & Conditions and Privacy Policy.",
      });
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const accessToken = localStorage.getItem('accessToken');
    
    try {
      const response = await fetch("https://logistics.nicheperfumery.ae/auth/register-user", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your account has been created successfully.",
      });

      // Optionally reset the form
      form.reset();
      setIsChecked(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while submitting the form.",
      });
    }
  };

  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img src="assets/images/auth/deliv.png" alt="" />
        </div>
      </div>
      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <div>
            <Link to="/" className="mb-40 max-w-290-px">
              <i className="ri-truck-fill"></i>
              <span className="px-3">LogiFlow Pro</span>
            </Link>
            <h4 className="mb-12">Sign Up to your Account</h4>
            <p className="mb-32 text-secondary-light text-lg">
              Welcome back! please enter your detail
            </p>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-16">
              <label className="m-1" htmlFor="">
                Company Name
              </label>
              <input
                type="text"
                required
                className="form-control h-56-px bg-neutral-50 radius-12"
                name="companyName"
                placeholder="Company Name"
              />
            </div>

            <div className="mb-16">
              <label className="m-1" htmlFor="">
                Email
              </label>
              <input
                type="email"
                required
                className="form-control h-56-px bg-neutral-50 radius-12"
                name="email"
                placeholder="Contact Person Email"
              />
            </div>

            <div className="mb-16">
              <label className="m-1" htmlFor="">
                Registration Number
              </label>
              <input
                type="text"
                required
                className="form-control h-56-px bg-neutral-50 radius-12"
                name="registrationNumber"
                placeholder="Company Registration Number"
              />
            </div>

            <div className="mb-16">
              <label className="m-1" htmlFor="">
                Contact Person Name
              </label>
              <input
                type="text"
                required
                className="form-control h-56-px bg-neutral-50 radius-12"
                name="contactPersonName"
                placeholder="Contact Person Name"
              />
            </div>

            <div className="mb-16" hidden>
              
              <input
                type="text"
                required
                value={"customers"}
                className="form-control h-56-px bg-neutral-50 radius-12"
                name="userType"
              />
            </div>

            <div className="mb-16">
              <label className="m-1" htmlFor="">
                Contact Number
              </label>
              <input
                type="text"
                required
                className="form-control h-56-px bg-neutral-50 radius-12"
                name="contactNumber"
                placeholder="Contact Person Number"
              />
            </div>

            <div className="mb-16">
              <label className="m-1" htmlFor="">
                Trade License
              </label>
              <input
                type="file"
                required
                className="form-control h-56-px bg-neutral-50 radius-12"
                name="tradeLicense"
              />
            </div>

            <div className="mb-16">
              <label className="m-1" htmlFor="">
                Vat Certificate
              </label>
              <input
                type="file"
                required
                className="form-control h-56-px bg-neutral-50 radius-12"
                name="vatCertificate"
              />
            </div>

            <div className="mb-20">
              <label className="m-1" htmlFor="">
                Password
              </label>

              <div className="position-relative ">
                <div className="icon-field">
                  <span className="icon top-50 translate-middle-y">
                    <Icon icon="solar:lock-password-outline" />
                  </span>
                  <input
                    required
                    type={isShowPassword ? "text" : "password"}
                    className="form-control h-56-px bg-neutral-50 radius-12"
                    id="your-password"
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <span
                  onClick={() => showPassword()}
                  className={
                    isShowPassword
                      ? `toggle-password ri-eye-off-fill cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`
                      : `toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`
                  }
                  data-toggle="#your-password"
                />
              </div>
              <span className="mt-12 text-sm text-secondary-light">
                Your password must have at least 8 characters
              </span>
            </div>

            <div className="">
              <div className="d-flex justify-content-between gap-2">
                <div className="form-check style-check d-flex align-items-start">
                  <input
                    className="form-check-input border border-neutral-300 mt-4"
                    type="checkbox"
                    id="condition"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="form-check-label text-sm"
                    htmlFor="condition"
                  >
                    By creating an account means you agree to the
                    <Link to="#" className="text-primary-600 fw-semibold">
                      Terms &amp; Conditions
                    </Link>{" "}
                    and our
                    <Link to="#" className="text-primary-600 fw-semibold">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
              disabled={!isChecked}
            >
              {" "}
              Sign Up
            </button>
            <div className="mt-32 text-center text-sm">
              <p className="mb-0">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-primary-600 fw-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpLayer;
