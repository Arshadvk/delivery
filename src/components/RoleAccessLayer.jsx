import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios";

const RoleAccessLayer = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [role, setRoles] = useState([]);
  const handlePermissionChange = (selectedOptions) => {
    setSelectedPermissions(selectedOptions || []);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform delete logic here
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  const roles = [
    { no: 1, description: "Dashboard Admin", role: "Admin" },
    { no: 2, description: "Company Driver", role: "Driver" },
    { no: 3, description: "User Dashboard", role: "User" },
  ];

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log("start");
    const token = localStorage.getItem("accessToken");
  
    if (token && selectedRole?._id) {
      axios
        .put(`https://logistics.nicheperfumery.ae/role/${selectedRole._id}`, selectedRole, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Updated Role:", response.data.data);
  
          // ✅ Show success alert
          Swal.fire({
            icon: "success",
            title: "Role Updated",
            text: "The role has been updated successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
  
          // ✅ Refresh the role list
          axios
            .get("https://logistics.nicheperfumery.ae/role", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setRoles(response.data.data.data);
              console.log("Role data:", response.data.data.data);
            })
            .catch((error) => {
              console.error("Error fetching roles:", error);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to fetch updated roles.",
              });
            });
  
          // ✅ Optionally close modal manually (if needed)
          // document.getElementById("editModalCloseBtn")?.click();
        })
        .catch((error) => {
          console.log("Error updating role:", error);
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: "There was a problem updating the role.",
          });
        }).finally(()=>{
          document.getElementById("editModalCloseBtn")?.click();
        });
    }
  };
  
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
  
    const form = e.target;
    const name = form.name.value.trim();
    const description = form.description.value.trim();
  
    const roleData = {
      name,
      description,
      permissions: selectedPermissions.map((perm) => perm.value), // assuming you use permission ids
    };
  
    if (token) {
      axios
        .post("https://logistics.nicheperfumery.ae/role/", roleData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Created Role:", response.data.data);
  
          Swal.fire({
            icon: "success",
            title: "Role Created",
            text: "The role has been added successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
  
          // Refresh role list
          axios
            .get("https://logistics.nicheperfumery.ae/role", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setRoles(response.data.data.data);
            })
            .catch((error) => {
              console.error("Error fetching roles:", error);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to fetch updated roles.",
              });
            });
  
          // ✅ Close the modal
          
        })
        .catch((error) => {
          console.log("Error creating role:", error);
          Swal.fire({
            icon: "error",
            title: "Creation Failed",
            text: "There was a problem creating the role.",
          });
        }).finally(()=>{
          document.getElementById("addModalCloseBtn")?.click();
        });;
    }
  };
  

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      // Fetch Roles
      axios.get("https://logistics.nicheperfumery.ae/role", {
        headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setRoles(response.data.data.data);
          console.log("Role data:", response.data.data.data);
        })
        .catch((error) => {
          console.error("Error fetching role:", error);
        });

      // Fetch Permissions
      axios.get("https://logistics.nicheperfumery.ae/permission", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.data.data;

          // ✅ Make sure to return the value in map
          const permissionOptions = data?.map((item) => ({
            label: item.name,
            value: item.name,
          }));
          setPermissions(permissionOptions);

          console.log("Permission data:", permissionOptions);
        })
        .catch((error) => {
          console.log("Error fetching permissions:", error);
        });
    }
  }, []);

  return (
    <>
      <div className="card h-100 p-0 radius-12">
        <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
          <div className="d-flex align-items-center flex-wrap gap-3">
            <form className="navbar-search">
              <input
                type="text"
                className="bg-base h-40-px w-auto"
                name="search"
                placeholder="Search"
              />
              <Icon icon="ion:search-outline" className="icon" />
            </form>
          </div>

          <button
            type="button"
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <Icon
              icon="ic:baseline-plus"
              className="icon text-xl line-height-1"
            />
            Add New Role
          </button>
        </div>
        <div className="card-body p-24">
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table sm-table mb-0">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Role </th>
                  <th>Description</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {role?.map((role, index) => (
                  <tr key={role.id}>
                    <td>{index + 1}</td>
                    <td>{role?.name}</td>
                    <td>{role?.description}</td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          type="button"
                          onClick={() => {
                            setSelectedRole(role); // pass current role object
                            setSelectedPermissions(
                              role.permissions?.map((perm) => ({
                                label: perm.name,
                                value: perm.name,
                              }))
                            );
                          }}
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </button>

                        <button
                          onClick={handleDelete}
                          type="button"
                          className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="fluent:delete-24-regular"
                            className="menu-icon"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal Start */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="modal-header py-16 px-24 border border-top-0 border-start-0 border-end-0">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add New Role
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="addModalCloseBtn"
                aria-label="Close"
              />
            </div>
            <div className="modal-body p-24">
              <form onSubmit={handleAddSubmit}>
                <div className="row">
                  <div className="col-12 mb-20">
                    <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                      Role Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control radius-8"
                      placeholder="Enter Role  Name"
                    />
                  </div>
                  <div className="col-12 mb-20">
                    <label
                      htmlFor="desc"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="desc"
                      name="description"
                      rows={4}
                      cols={50}
                      placeholder="Write about role"
                      defaultValue={""}
                    />
                  </div>

                  <div className="col-12 mb-20">
                    <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                      Permissions
                    </label>
                    <Select
                      isMulti
                      name="permissions"
                      options={permissions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={selectedPermissions}
                      onChange={handlePermissionChange}
                      placeholder="Select permissions..."
                    />
                  </div>

                  <div className="d-flex align-items-center justify-content-center gap-3 mt-24">
                    <button
                      type="reset"
                      className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                    >
                      Rest
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary border border-primary-600 text-md px-48 py-12 radius-8"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal End */}

      {/* Edit Modal Start */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="modal-header py-16 px-24 border border-top-0 border-start-0 border-end-0">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Role
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="editModalCloseBtn"
              />
            </div>
            <div className="modal-body p-24">
              <form onSubmit={handleEditSubmit}>
                <div className="row">


                  <input hidden type="text" value={selectedRole?._id}/>

                  <div className="col-12 mb-20">
                    <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                      Role Name
                    </label>
                    <input
                      type="text"
                      name="roleName"
                      className="form-control radius-8"
                      placeholder="Enter Role Name"
                      value={selectedRole?.name}
                      onChange={(e) =>
                        setSelectedRole((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />


                  </div>
                  <div className="col-12 mb-20">
                    <label
                      htmlFor="desc"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="desc"
                      name="description"
                      rows={4}
                      cols={50}
                      placeholder="Write about role"
                      value={selectedRole?.description || ""}
                    />

                  </div>

                  <div className="col-12 mb-20">
                    <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                      Permissions
                    </label>
                    <Select
                      isMulti
                      name="permissions"
                      options={permissions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={selectedPermissions}
                      onChange={handlePermissionChange}
                      placeholder="Select permissions..."
                    />
                  </div>

                  <div className="d-flex align-items-center justify-content-center gap-3 mt-24">
                    <button
                      type="reset"
                      className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                    >
                      Rest
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary border border-primary-600 text-md px-48 py-12 radius-8"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal End */}
    </>
  );
};

export default RoleAccessLayer;
