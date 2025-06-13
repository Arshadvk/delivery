import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ViewProfileLayer = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [update, setUpdate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVerified , setIsVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setLoading(true); // Start loading
      axios
        .get(`https://logistics.nicheperfumery.ae/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data.data);
          console.log(userData);
        if(!response.data.data?.isVerified){
            console.log(userData?.isVerified);
            setIsVerified(true);
            console.log(isVerified)
          };

        })
        .catch((error) => {
          console.log("Error fetching user:", error);
        })
        .finally(() => {
          setLoading(false); // Stop loading
        });
    }
  }, [update]);

  const verifyUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to verify this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, verify!",
    }).then((result) => {
      if (result.isConfirmed) {
        setUpdate(true);
        const token = localStorage.getItem("accessToken");
        if (token) {
          axios
            .post(
              `https://logistics.nicheperfumery.ae/user/${id}/verify`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then(() => {
              Swal.fire("Verified!", "User has been verified.", "success");
            })
            .catch((error) => {
              console.log("Error verifying user:", error);
            });
        }
      }
    });
  };

  const submitSave = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this user?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Yes, Save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();

        formData.append("companyName", userData?.companyName || "");
        formData.append(
          "registrationNumber",
          userData?.registrationNumber || ""
        );
        formData.append("name", userData?.name || "");
        formData.append("email", userData?.email || "");
        formData.append("contactNumber", userData?.contactNumber || "");
        formData.append("isDeleted", userData?.isDeleted);
        formData.append("isEmailVerified", userData?.isEmailVerified);
        formData.append("isSuspended", userData?.isSuspended);
        formData.append("isVerified", userData?.isVerified);
        formData.append("userType", userData?.userType || "");

        const token = localStorage.getItem("accessToken");

        axios
          .put(
            `https://logistics.nicheperfumery.ae/user/update-customer/${id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data", // Important
              },
            }
          )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Customer Update successful!",
            });
            setIsEdit(false);
            setUpdate(!update);
            setIsVerified(false);
             // Refresh data
          })
          .catch((error) => {
            console.error(
              "Update error:",
              error?.response?.data || error.message
            );
            Swal.fire({
              icon: "error",
              title: "Update Failed",
              text: "Check the form data. Server error.",
            });
          });
      }
    });
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center text-center mt-10">
          <div>
            <span
              className="spinner-border spinner-border-sm me-2 pt-10"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </div>
        </div>
      ) : (
        <div className="row gy-4">
          
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
              <div>
                {isEdit ? (
                  <div className="d-flex gap-2">
                    <button
                      onClick={submitSave}
                      className="btn bg-black text-white border border-black text-md px-56 py-12 radius-8"
                    >
                      <i className="ri-save-3-fill"></i> Save
                    </button>
                    <button
                      onClick={() => setIsEdit(false)}
                      className="btn bg-red text-white border border-black text-md px-5 py-12 radius-8"
                    >
                      <i className="ri-close-fill"></i> Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="btn bg-black text-white border border-black text-md px-5 py-12 radius-8"
                  >
                    <i className="ri-edit-2-fill"></i> Edit User
                  </button>
                )}
              </div>
              {isVerified && (
              <button
                onClick={verifyUser}
                className="btn bg-black text-white border border-black text-md px-56 py-12 radius-8"
              >
                <i className="ri-shield-check-fill"></i> Verify User
              </button>
          )}
            </div>

          {/* Company Info */}
          <div className="col-lg-8">
            <div className="card h-100">
              <div className="card-body p-24">
                <h5 className="text-lg mb-4">Company Information</h5>
                <div className="row">
                  {[
                    { label: "Company Name", key: "companyName" },
                    { label: "Registration Number", key: "registrationNumber" },
                    { label: "Tax ID", key: "taxId" },
                    { label: "Industry", key: "industry" },
                  ].map(({ label, key }) => (
                    <div className="col-sm-6 mb-3" key={key}>
                      <span className="text-xs">{label}</span>
                      {isEdit ? (
                        <div>
                          <input
                            type="text"
                            className="w-full border p-4 rounded px-5"
                            value={userData[key] || ""}
                            onChange={(e) =>
                              setUserData((prevData) => ({
                                ...prevData,
                                [key]: e.target.value,
                              }))
                            }
                          />
                        </div>
                      ) : (
                        <p className="text-black">{userData[key]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Box */}
          <div className="col-lg-4">
            <div className="p-5 text-center border radius-16 bg-base h-100">
              <h3 className="text-2xl mb-2">Payment Due</h3>
              <span className="text-lg text-danger">XXXX</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-8">
            <div className="card h-100">
              <div className="card-body p-24">
                <h5 className="text-lg mb-5">Contact Information</h5>
                <div className="row">
                  {[
                    { label: "Contact Person", key: "name" },
                    { label: "Position", key: "position" },
                    { label: "Email", key: "email" },
                    { label: "Phone", key: "contactNumber" },
                  ].map(({ label, key }) => (
                    <div className="col-sm-6 mb-3" key={key}>
                      <span className="text-xs">{label}</span>
                      {isEdit ? (
                        <div>
                          <input
                            type="text"
                            className="w-full border p-4 rounded px-5"
                            value={userData[key] || ""}
                            onChange={(e) =>
                              setUserData((prevData) => ({
                                ...prevData,
                                [key]: e.target.value,
                              }))
                            }
                          />
                        </div>
                      ) : (
                        <p className="text-black">{userData[key]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="col-lg-4">
            <div className="p-5 border radius-16 bg-base h-full">
              <h3 className="text-xl mb-3">Documents</h3>

              <div className="flex flex-column gap-3">
                {/* Document Card */}
                <a
                  href={userData?.tradeLicense}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    style={{ display: "flex" }}
                    className="mb-3 flex items-center gap-3 p-3 border radius-16 bg-base transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                  >
                    <div className="text-2xl text-danger">
                      <i className="ri-file-pdf-2-line"></i>
                    </div>
                    <div className="flex-1 px-2 text-start">
                      <p className="mb-1">Business&nbsp;Registration</p>
                      <p className="text-sm text-muted">PDF · 2.3 MB</p>
                    </div>
                    <div className="text-xl text-primary cursor-pointer">
                      <i className="ri-download-2-line"></i>
                    </div>
                  </div>
                </a>

                <a href={userData?.vatCertificate} target="_blank">
                  <div
                    style={{ display: "flex" }}
                    className="flex items-center gap-3 p-3 border radius-16 bg-base w-full"
                  >
                    <div className="text-2xl text-danger">
                      <i className="ri-file-pdf-2-line"></i>
                    </div>
                    <div className="flex-1 px-2 text-start">
                      <p className="mb-1">Tax&nbsp;Certificate</p>
                      <p className="text-sm text-muted">PDF · 1.1 MB</p>
                    </div>
                    <div className="text-xl text-primary cursor-pointer">
                      <i className="ri-download-2-line"></i>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Address Info */}
          <div className="col-lg-8">
            <div className="card h-100">
              <div className="card-body p-24">
                <h5 className="text-lg mb-4">Address</h5>
                <p className="text-black mb-1">123 Business Street</p>
                <p className="text-black mb-1">Suite 456</p>
                <p className="text-black mb-1">New York, NY 10001</p>
                <p className="text-black">United States</p>
              </div>
            </div>
          </div>

          {/* Registration Details */}
          <div className="col-lg-4">
            <div className="p-5 border radius-16 bg-base h-100">
              <h3 className="text-xl mb-3">Registration Details</h3>
              <span className="text-xs">Registered At</span>
              <p className="text-black mb-3">2025-04-15 14:30:00</p>

              <span className="text-xs">Status</span>
              <p className="text-black mb-3">Pending Approval</p>

              <span className="text-xs">Last Updated</span>
              <p className="text-black">2025-04-16 09:15:00</p>
            </div>
          </div>

          {/* Report Section */}
          <div className="col-lg-12">
            <div className="card h-100">
              <div className="card-body p-24">
                <div className="d-flex justify-between align-items-center mb-3">
                  <div>
                    <label>Date Range</label>
                    <div className="d-flex gap-2">
                      <input type="date" />
                      <span>to</span>
                      <input type="date" />
                    </div>
                  </div>
                </div>
                <div className="row text-center mt-4">
                  <div className="col">
                    <strong>Total Revenue</strong>
                  </div>
                  <div className="col">
                    <strong>Total Orders</strong>
                  </div>
                  <div className="col">
                    <strong>Total RTO</strong>
                  </div>
                  <div className="col">
                    <strong>RTO/Delivery Ratio</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProfileLayer;
