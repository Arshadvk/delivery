import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import Select from "react-select";
import axios from 'axios';

const AddAdminLayer = () => {

    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [permissionOptions, setPermissionOptions] = useState([]);
  const [isShowPassword, setShowPassword] = useState(false);

    const handlePermissionChange = (selectedOptions) => {
        setSelectedPermissions(selectedOptions || []);
    };
    
    const showPassword = () => {
        setShowPassword(!isShowPassword);
      };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        axios.get('https://logistics.nicheperfumery.ae/role')
            .then((response) => {
                console.log(response.data)
                setPermissionOptions(response.data); 
                
                
                const data = response.data.data.data;

          // ✅ Make sure to return the value in map
          const permissionOptions = data?.map((item) => ({
            label: item.name,
            value: item.name,
          }));
          setPermissionOptions(permissionOptions);

          console.log("Permission data:", permissionOptions);


                // Adjust if API structure differs
            })
            .catch((error) => {
                if(error.status == 401){
                    localStorage.removeItem('accessToken')
                }
                console.error('Failed to fetch roles:', error);
            });
    }, []);
    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-body p-24">
                <div className="row justify-content-center">
                    <div className="col-xxl-6 col-xl-8 col-lg-10">
                        <div className="card border">
                            <div className="card-body">
                                <form action="#">
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
                                            name='name'
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
                                            name='email'
                                            required
                                            placeholder="Enter email address"
                                        />
                                    </div>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="email"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            User Type <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control radius-8"
                                            id="email"
                                            name='userType'
                                            value={"admin"}
                                            required
                                            placeholder="Enter email address"
                                        />
                                    </div>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="email"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            User Role<span className="text-danger-600">*</span>
                                        </label>
                                    <Select
                                        isMulti
                                        name="permissions"
                                        options={permissionOptions}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        value={selectedPermissions}
                                        onChange={handlePermissionChange}
                                        placeholder="Select Roles..."
                                    />
                                    </div>
                                    <label
                                            htmlFor="email"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                           Password <span className="text-danger-600">*</span>
                                        </label>
                                   <div className='position-relative mb-20'>
                                    
                                              <div >
                                                
                                                <input
                                                  type={isShowPassword ? 'text' : 'password'}
                                                  name='password'
                                                 className="form-control radius-8"
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
                                        >
                                            Save
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

export default AddAdminLayer;