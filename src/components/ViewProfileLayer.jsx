import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ViewProfileLayer = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [update, setUpdate] = useState(false);
  const [isEdit , setIsEdit] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      axios
        .get(`https://logistics.nicheperfumery.ae/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data.data);
          console.log("Role data:", response.data.data);
        })
        .catch((error) => {
          console.log("Error fetching role:", error);
        });
    }
  }, [update]);

  
  const verifyUser = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to verify this user?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, verify!'
    }).then((result) => {
      if (result.isConfirmed) {
        setUpdate(true)
        const token = localStorage.getItem("accessToken");
        if (token) {
          axios
            .post(`https://logistics.nicheperfumery.ae/user/${id}/verify`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log("Role data:", response.data.data);
            })
            .catch((error) => {
              console.log("Error fetching role:", error);
            });
        }
        Swal.fire(
          'Verified!',
          'User has been verified.',
          'success'
        );
      }
      
    });
  };

  return (
    <div className="row gy-4">
        {!userData?.isVerified ? (
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          {isEdit ? (<div className="d-flex gap-2">
            <button
            type="submit"
            onClick={()=>setIsEdit(true)}
            className="btn bg-black text-white border border-black text-md px-56 py-12 radius-8"
          >
           <i class="ri-save-3-fill"></i> Save
          </button>
          <button
            type="submit"
            onClick={()=>setIsEdit(false)}
            className="btn bg-red text-white border border-black text-md px-5 py-12 radius-8"
          >
           <i class="ri-close-fill"></i> Cancel
          </button>
          </div>) : (<div><button
            type="submit"
            onClick={()=>setIsEdit(true)}
            className="btn bg-black text-white border border-black text-md px-5 py-12 radius-8"
          >
           <i class="ri-shield-check-fill"></i> Edit User
          </button></div>)}
        
          
        </div>
        <div>
          
          <button
            type="submit"
            onClick={()=>verifyUser()}
            className="btn bg-black text-white border border-black text-md px-56 py-12 radius-8"
          >
           <i class="ri-shield-check-fill"></i> verify user
          </button>
        </div>
      </div>) :(<div></div>)}
      

      <div className="col-lg-8">
        <div className="card h-100">
          <div className="card-body p-24">
            <h5 className="text-lg mb-4">Company Information</h5>
            <div className="row">
              <div className="col-sm-6 mb-3">
                <span className="text-xs">Company Name</span>
                {isEdit ? ( <div><input type="text"  className="w-full border p-4 rounded px-5" value={userData?.companyName }/> </div>) : ( <p className="text-black">
                  {userData?.companyName}
                </p>)}
               
               
              </div>
              <div className="col-sm-6 mb-3">
                <span className="text-xs">Registration Number</span>
                <p className="text-black">{isEdit ? ( <div><input type="text"  className="w-full border p-4 rounded px-5" value={userData?.registrationNumber }/> </div>) :( userData?.registrationNumber)}</p>
              </div>
              <div className="col-sm-6 mb-3">
                <span className="text-xs">Tax ID</span>
                <p className="text-black">{isEdit ? ( <div><input type="text"  className="w-full border p-4 rounded px-5" value={userData?.registrationNumber }/> </div>) :( userData?.registrationNumber)}</p>
              </div>
              <div className="col-sm-6 mb-3">
                <span className="text-xs">Industry</span>
                <p className="text-black">{isEdit ? ( <div><input type="text"  className="w-full border p-4 rounded px-5" value={userData?.registrationNumber }/> </div>) :( userData?.registrationNumber)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Payment Box */}
      <div className="col-lg-4">
        <div className="p-5 text-center border radius-16 bg-base h-100">
          <h3 className="text-2xl mb-2">Payment Due</h3>
          <span className="text-lg text-danger">XXXX</span>
        </div>
      </div>

      {/* Left Contact Info */}
      <div className="col-lg-8">
        <div className="card h-100">
          <div className="card-body p-24">
            <h5 className="text-lg mb-5">Contact Information</h5>
            <div className="row">
              <div className="col-sm-6 mb-3">
                <span className="text-xs">Contact Person</span>
                <p className="text-black">{isEdit ? ( <div><input type="text"  className="w-full border p-4 rounded px-5" value={userData?.contactPersonName }/> </div>) :( userData?.contactPersonName)}</p>
              </div>
              <div className="col-sm-6 mb-3">
                <span className="text-xs">Position</span>
                <p className="text-black">{isEdit ? ( <div><input type="text"  className="w-full border p-4 rounded px-5" value={userData?.contactPersonName }/> </div>) :( userData?.contactPersonName)}</p>
              </div>
              <div className="col-sm-6 mb-3">
                <span className="text-xs">Email</span>
               
                <p className="text-black">{isEdit ? ( <div><input type="text"  className="w-full border p-4 rounded px-5" value={userData?.email }/> </div>) :( userData?.email)}</p>
              </div>
              <div className="col-sm-6 mb-3">
                <span className="text-xs">Phone</span>
                <p className="text-black">{isEdit ? ( <div><input type="text"  className="w-full border p-4 rounded px-5" value={userData?.contactNumber }/> </div>) :( userData?.contactNumber)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Document Cards */}
      <div className="col-lg-4">
        <div className="p-5 border radius-16 bg-base h-100">
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
                  <p className="mb-1">Business Registration</p>
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
                className="flex items-center  gap-3 p-3 border radius-16 bg-base"
              >
                <div className="text-2xl text-danger">
                  <i className="ri-file-pdf-2-line"></i>
                </div>
                <div className="flex-1 px-2 text-start">
                  <p className="mb-1">Tax Certificate</p>
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

      {/* Left Address */}
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

      {/* Right Registration Details */}
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

      {/* Bottom Report (Revenue etc.) */}
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
  );
};

export default ViewProfileLayer;
