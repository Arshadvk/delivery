import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignInLayer = () => {
  const navigate = useNavigate();

  const [isShowPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "admin@logad.com",
    password: "Password@123",
  });

  const showPassword = () => {
    setShowPassword(!isShowPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log( "email:" , formData.email)
      console.log( "password:" , formData.password)
      const response = await axios.post(
        "https://logistics.nicheperfumery.ae/auth/login-user",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // Optional: Save token or user info from response
      console.log("Login successful:", response.data);

      
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Login successful!",
      }).then(() => {
        navigate("/dashboard"); // 🔁 Redirect to dashboard after alert
      });

      // You can redirect user here if needed
      // navigate('/dashboard');

    } catch (error) {
      console.error("Login failed:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed. Please check your credentials.",
      }).then(() => {
        navigate("/dashboard"); // 🔁 Redirect to dashboard after alert
      });
    }
  };

  return (
    <section className='auth bg-base d-flex flex-wrap'>
      <div className='auth-left d-lg-block d-none'>
        <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
          <img src='assets/images/auth/deliv.png' alt='' />
        </div>
      </div>

      <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <div>
            <Link to='/' className='mb-40 max-w-290-px d-flex align-items-center'>
              <i className="ri-truck-fill text-lg"></i>
              <span className="px-3">LogiFlow Pro</span>
            </Link>
            <h4 className='mb-12'>Sign In to your Account</h4>
            <p className='mb-32 text-secondary-light text-lg'>
              Welcome back! please enter your detail
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='icon-field mb-16'>
              <span className='icon top-50 translate-middle-y'>
                <Icon icon='mage:email' />
              </span>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='form-control h-56-px bg-neutral-50 radius-12'
                placeholder='Email'
              />
            </div>

            <div className='position-relative mb-20'>
              <div className='icon-field'>
                <span className='icon top-50 translate-middle-y'>
                  <Icon icon='solar:lock-password-outline' />
                </span>
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='form-control h-56-px bg-neutral-50 radius-12'
                  id='your-password'
                  placeholder='Password'
                />
              </div>
              <span
                onClick={showPassword}
                className={`toggle-password ${
                  isShowPassword ? "ri-eye-off-fill" : "ri-eye-line"
                } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
              />
            </div>

            <div className='d-flex justify-content-end gap-2'>
              <Link to='#' className='text-primary-600 fw-medium'>
                Forgot Password?
              </Link>
            </div>

            <button
              type='submit'
              className='btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32'
            >
              Sign In
            </button>

            <div className='mt-32 text-center text-sm'>
              <p className='mb-0'>
                Don’t have an account?{" "}
                <Link to='/sign-up' className='text-primary-600 fw-semibold'>
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
