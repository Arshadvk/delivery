import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UsersListLayer = ({ user }) => {
    const [userData, setUserData] = useState([])
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
                // Perform delete logic here
                Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
            }
        });
    };

    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            const page = 1;
            const limit = 10;
            const search = ""; // Replace with search value if needed

            axios.get(`https://logistics.nicheperfumery.ae/user/list-customers?page=${page}&limit=${limit}&search`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    console.log(response?.data?.data?.data)
                    setUserData(response?.data?.data?.data || []);
                })
                .catch((error) => {

                    console.error("Error fetching users:", error);
                });
        }
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            axios.get(`https://logistics.nicheperfumery.ae/user/list-${user}?page=1&limit=10&search=${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setUserData(response?.data?.data?.data || []);
                })
                .catch((error) => {
                    console.error("Search failed:", error);
                });
        }
    };


    return (
        <div className="card h-100 p-0 radius-12">
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
                    <Icon
                        icon="ic:baseline-plus"
                        className="icon text-xl line-height-1"
                    />
                    Add New User
                </Link>
            </div>
            <div className="card-body p-24">
                <div className="table-responsive scroll-sm">
                    <table className="table bordered-table sm-table mb-0">
                        <thead>
                            <tr>
                                <th scope="col"> No </th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Payment Due</th>
                                <th scope="col">Phone</th>
                                <th scope="col" className="text-center">
                                    Status
                                </th>
                                <th scope="col" className="text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user, index) => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="d-flex align-items-center gap-10">{index + 1}</div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            {/* <img
                                                src={user.image }
                                                alt={user.name}
                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                            /> */}
                                            <div className="flex-grow-1">
                                                <span className="text-md mb-0 fw-normal text-secondary-light">
                                                    {user.name || "null"}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-md mb-0 fw-normal text-secondary-light">
                                            {user.email || "null"}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-md mb-0 fw-normal text-secondary-light">
                                            {user.due || "xxx"}
                                        </span>
                                    </td>
                                    <td>{user.contactNumber || "null"}</td>
                                    <span className={`mt-3 px-24 py-4 radius-4 fw-medium text-sm border ${user.isVerified === true
                                        ? "bg-success-focus text-success-600 border-success-main"
                                        : "bg-danger-focus text-danger-600 border-danger-main"
                                        }`}>
                                        {user.isVerified || 'Inactive'}
                                    </span>
                                    <td className="text-center">
                                        <div className="d-flex align-items-center gap-10 justify-content-center">
                                            <button
                                                onClick={() => navigate('/view-profile')}
                                                type="button"
                                                className="bg-hover-info-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                            >
                                                <Icon icon="majesticons:eye-line" className="icon text-xl" />
                                            </button>
                                            <button
                                                onClick={() => navigate('/view-profile')}
                                                type="button"
                                                className="bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                            >
                                                <Icon icon="lucide:edit" className="menu-icon" />
                                            </button>
                                            <button
                                                onClick={handleDelete}
                                                type="button"
                                                className="remove-item-btn bg-hover-danger-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
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

    );
};

export default UsersListLayer;