import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const statusTabs = [
  { label: 'Pending', value: 'pending' },
  { label: 'Verified', value: 'verified' },
  { label: 'Suspended', value: 'suspended' },
  { label: 'Deleted', value: 'deleted' },
];

const UsersListLayer = ({ user }) => {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(selectedTab, searchTerm, currentPage);
  }, [selectedTab, currentPage]);

  const fetchUsers = (status, search = '', page = 1) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios.get(
        `https://logistics.nicheperfumery.ae/user/list-customers?page=${page}&limit=10&search=${search}&status=${status}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => {
          const data = response?.data?.data || {};
          setUserData(data.data || []);
          setCount(data.totalCount || 0);
          setTotalPages(data.totalPages || 1);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchUsers(selectedTab, searchTerm, 1);
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      }
    });
  };

  return (
    <>
      <div className="card h-100 p-0 radius-12">
        {/* Header */}
        <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
          <div className="d-flex align-items-center flex-wrap gap-3">
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Link
            to={`/add-${user}`}
            className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
          >
            <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
            Add New User
          </Link>
        </div>

        {/* Tabs */}
        <div className="px-24 pt-24">
          <ul className="nav nav-tabs d-flex gap-3 border-bottom mb-16">
            {statusTabs.map((tab) => (
              <li
                key={tab.value}
                style={{
                  borderBottom: selectedTab === tab.value ? '2px solid black' : '2px solid transparent',
                }}
                className={`nav-item px-3 py-2 cursor-pointer ${
                  selectedTab === tab.value ? 'text-black fw-bold' : 'text-secondary'
                }`}
                onClick={() => {
                  setSelectedTab(tab.value);
                  setCurrentPage(1); // Reset to page 1 when switching tab
                }}
              >
                {selectedTab === tab.value ? `${tab.label} ( ${count} )` : tab.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Table */}
        <div className="card-body p-24 pt-0">
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table sm-table mb-0">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Payment Due</th>
                  <th>Phone</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.length > 0 ? (
                  userData.map((user, index) => (
                    <tr key={user.id}>
                      <td>{(currentPage - 1) * 10 + index + 1}</td>
                      <td><span className="text-md fw-normal text-secondary-light">{user.name || 'null'}</span></td>
                      <td><span className="text-md fw-normal text-secondary-light">{user.email || 'null'}</span></td>
                      <td><span className="text-md fw-normal text-secondary-light">{user.due || 'xxx'}</span></td>
                      <td>{user.contactNumber || 'null'}</td>
                      <td className="text-center">
                        <span className={`px-24 py-4 radius-4 fw-medium text-sm border ${user.isVerified
                          ? 'bg-success-focus text-success-600 border-success-main'
                          : 'bg-danger-focus text-danger-600 border-danger-main'}`}>
                          {user.isVerified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="d-flex align-items-center gap-10 justify-content-center">
                          <button
                            onClick={() => navigate(`/view-profile/${user._id}`)}
                            className="bg-hover-info-200 w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                          >
                            <Icon icon="majesticons:eye-line" className="icon text-xl" />
                          </button>
                         
                          <button
                            onClick={handleDelete}
                            className="bg-hover-danger-200 w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                          >
                            <Icon icon="fluent:delete-24-regular" className="menu-icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-secondary py-4">
                      No users found for "{selectedTab}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center gap-2 my-5">
        <button
          className="btn btn-sm btn-outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              className={`btn btn-sm ${pageNumber === currentPage ? 'bg-black text-white' : 'btn-outline'}`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className="btn btn-sm btn-outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default UsersListLayer;
