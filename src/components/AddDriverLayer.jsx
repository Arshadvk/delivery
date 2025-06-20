import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddDriverLayer = () => {
  const navigate = useNavigate();
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [permissionOptions, setPermissionOptions] = useState([]);
  const [isShowPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePermissionChange = (selectedOptions) => {
    setSelectedRoles(selectedOptions || []);
  };

  const showPassword = () => {
    setShowPassword(!isShowPassword);
  };

  useEffect(() => {
    axios
      .get("https://logistics.nicheperfumery.ae/role")
      .then((response) => {
        console.log(response.data);
        setPermissionOptions(response.data);

        const data = response.data.data.data;

        // ✅ Make sure to return the value in map
        const permissionOptions = data?.map((item) => ({
          label: item.name,
          value: item._id,
        }));
        setPermissionOptions(permissionOptions);

        console.log("Permission data:", permissionOptions);

        // Adjust if API structure differs
      })
      .catch((error) => {
        if (error.status === 401) {
          localStorage.removeItem("accessToken");
        }
        console.error("Failed to fetch roles:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    const form = e.target;
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value

    const userData = {
      email: email,
      password: password ,
      name: name ,
      userType: "driver",
      isVerified: true,
      roles: selectedRoles.map((perm) => perm.value)
    }
    try {
      console.log(userData)
      axios.post("https://logistics.nicheperfumery.ae/auth/create-user", userData).then((res)=>{
         Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Driver Created successful!",
      });
      navigate('/drivers-list');
      }).catch((error)=>{
        console.log(error)
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Driver Creation failed. Please check your credentials.",
      });
      })
     
    } catch {
       Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Driver Creation failed. Please check your credentials.",
      });
    } finally {
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
                      Full Name <span className="text-danger-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="name"
                      name="name"
                      required
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
                      Email <span className="text-danger-600">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control radius-8"
                      id="email"
                      name="email"
                      required
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="mb-20" hidden>
                    <label
                      htmlFor="userType"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      User Type <span className="text-danger-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      name="userType"
                      value={"driver"}
                      required
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="mb-20">
                    <label
                      htmlFor="permissions"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      User Role<span className="text-danger-600">*</span>
                    </label>
                    <Select
                      isMulti
                      name="userRoles"
                      options={permissionOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={selectedRoles}
                      onChange={handlePermissionChange}
                      placeholder="Select Roles..."
                    />
                  </div>
                  <label
                    htmlFor="password"
                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                  >
                    Password <span className="text-danger-600">*</span>
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

export default AddDriverLayer;
