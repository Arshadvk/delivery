import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";

const RoleAccessLayer = () => {
  const navigate = useNavigate();
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const handlePermissionChange = (selectedOptions) => {
    setSelectedPermissions(selectedOptions || []);
  };
  const permissionOptions = [
    { value: "view_users", label: "View Users" },
    { value: "edit_users", label: "Edit Users" },
    { value: "delete_users", label: "Delete Users" },
    { value: "create_users", label: "Create Users" },
  ];

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
  return (
    <>
      <div className="card h-100 p-0 radius-12">
        <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
          <div className="d-flex align-items-center flex-wrap gap-3">
            {/* <span className="text-md fw-medium text-secondary-light mb-0">
                            Show
                        </span>
                        <select className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px" defaultValue="Select Number">
                            <option value="Select Number" disabled>
                                Select Number
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select> */}
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
                  <th>Description</th>
                  <th scope="col">Role </th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, index) => (
                  <tr key={role.id}>
                    <td>{role.no}</td>
                    <td>{role.description}</td>
                    <td>{role.role}</td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          type="button"
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
          {/* <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
                        <span>Showing 1 to 10 of 12 entries</span>
                        <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                            <li className="page-item">
                                <Link
                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                    to="#"
                                >
                                    <Icon icon="ep:d-arrow-left" className="" />
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md bg-primary-600 text-white"
                                    to="#"
                                >
                                    1
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px"
                                    to="#"
                                >
                                    2
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                    to="#"
                                >
                                    3
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                    to="#"
                                >
                                    4
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                    to="#"
                                >
                                    5
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                                    to="#"
                                >
                                    {" "}
                                    <Icon icon="ep:d-arrow-right" className="" />{" "}
                                </Link>
                            </li>
                        </ul>
                    </div> */}
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
                aria-label="Close"
              />
            </div>
            <div className="modal-body p-24">
              <form action="#">
                <div className="row">
                  <div className="col-12 mb-20">
                    <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                      Role Name
                    </label>
                    <input
                      type="text"
                      name="roleName"
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
                      options={permissionOptions}
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
              />
            </div>
            <div className="modal-body p-24">
              <form action="#">
                <div className="row">
                  <div className="col-12 mb-20">
                    <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                      Role Name
                    </label>
                    <input
                      type="text"
                      name="roleName"
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
                      options={permissionOptions}
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
