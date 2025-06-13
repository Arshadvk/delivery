import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useMemo, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DriverListLayer = ({ user }) => {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    

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
                Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
            }
        });
    };

    // Fetch data on mount
    useEffect(() => {
        fetchAdmins();
    }, [currentPage]);

    const fetchAdmins = () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setLoading(true); // Start loading
            const limit = 10;
            axios
                .get(`https://logistics.nicheperfumery.ae/user/list-admins?page=${currentPage}&limit=${limit}&search=`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setAdminData(response?.data?.data?.data || []);
                    setTotalPages(response?.data?.data.totalPages || 1);
                })
                .catch((error) => {
                    if(error.status == 401){
                        localStorage.removeItem('accessToken')
                    }
                    console.error("Error fetching admins:", error);
                }).finally(() => {
                    setLoading(false); // Stop loading
                  });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("accessToken");
        if (token) {
            axios
                .get(`https://logistics.nicheperfumery.ae/user/list-admins?page=1&limit=10&search=${searchTerm}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setAdminData(response?.data?.data?.data || []);
                })
                .catch((error) => {
                    console.error("Search failed:", error);
                });
        }
    };

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            } else {
                return { key, direction: 'asc' };
            }
        });
    };

    const sortedUsers = useMemo(() => {
        let sortableUsers = [...adminData];
        if (sortConfig.key !== null) {
            sortableUsers.sort((a, b) => {
                const aValue = a[sortConfig.key]?.toString().toLowerCase() || '';
                const bValue = b[sortConfig.key]?.toString().toLowerCase() || '';
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableUsers;
    }, [adminData, sortConfig]);

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
        <div>
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                <form
                    onSubmit={handleSearch}
                    className="navbar-search d-flex align-items-center gap-2"
                >
                    <input
                        type="text"
                        className="bg-base h-40-px w-auto"
                        name="search"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">
                        <Icon icon="ion:search-outline" className="icon" />
                    </button>
                </form>

                <Link
                    to={`/add-${user}`}
                    className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
                >
                    <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
                    Add New User
                </Link>
            </div>

            <div className="card-body p-24">
                <div className="table-responsive scroll-sm">
                    <table className="table bordered-table sm-table mb-0">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                                    Name <Icon icon="mdi:sort" />
                                </th>
                                <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
                                    Email <Icon icon="mdi:sort" />
                                </th>
                                <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }} className="text-center">
                                    Status <Icon icon="mdi:sort" />
                                </th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <span className="text-md mb-0 fw-normal text-secondary-light">
                                                {user.name || 'N/A'}
                                            </span>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td className="text-center">
                                        <span className={`mt-3 px-24 py-4 radius-4 fw-medium text-sm border ${user.isVerified === true
                                            ? "bg-success-focus text-success-600 border-success-main"
                                            : "bg-danger-focus text-danger-600 border-danger-main"
                                            }`}>
                                            {user.isVerified ? "Active " : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex align-items-center gap-10 justify-content-center">
                                            <button
                                                onClick={() => navigate(`/edit-driver/${user?._id}`)}
                                                type="button"
                                                className="bg-hover-success-200 w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                            >
                                                <Icon icon="lucide:edit" className="menu-icon" />
                                            </button>
                                            <button
                                                onClick={handleDelete}
                                                type="button"
                                                className="remove-item-btn bg-hover-danger-200 w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                            >
                                                <Icon icon="fluent:delete-24-regular" className="menu-icon" />
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
      </div>
         )}
     </>
    );
};

export default DriverListLayer;
