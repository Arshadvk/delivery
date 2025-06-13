import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const EditDriverLayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [userData, setUserData] = useState({});
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
      .get(`https://logistics.nicheperfumery.ae/user/${id}`)
      .then((response) => {
        console.log(response?.data?.data);
        setUserData(response?.data?.data);

        console.log("User Data:", userData);

        const selectOptions = userData?.roles?.map((item) => ({
          label: item.name,
          value: item._id,
        }));

        setSelectedRoles(selectOptions);
        // Adjust if API structure differs
      })
      .catch((error) => {
        if (error.status === 401) {
          localStorage.removeItem("accessToken");
        }
        console.error("Failed to fetch roles:", error);
      });


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

    const userData = {
      email: email,
      name: name ,
      userType: "driver",
      roles: selectedRoles?.map((perm) => perm.value)
    }
    try {
      console.log(userData)
      axios.put(`https://logistics.nicheperfumery.ae/user/${id}`, userData).then((res)=>{
         Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Driver Update successful!",
      });
      navigate('/drivers-list');
      }).catch((error)=>{
        console.log(error)
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Driver Update failed. Please check your credentials.",
      });
      })
     
    } catch {
       Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Driver Update failed. Please check your credentials.",
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
                      value={userData?.name}
                      onChange={(e) =>
                        setUserData((prevData) => ({
                          ...prevData,
                          name: e.target.value,
                        }))
                      }
                      required
                      placeholder="Enter Full Name"
                    />
               
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
                      value={userData?.email}
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

export default EditDriverLayer;
