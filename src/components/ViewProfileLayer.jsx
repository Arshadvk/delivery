import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';

const ViewProfileLayer = () => {
    const [imagePreview, setImagePreview] = useState('assets/images/user-grid/user-grid-img13.png');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // Toggle function for password field
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Toggle function for confirm password field
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const readURL = (input) => {
        if (input.target.files && input.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(input.target.files[0]);
        }
    };
    return (
        <div className="row gy-4">
            <div className="col-lg-8">
                <div className="card h-100">
                    <div className="card-body p-24">
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="pills-edit-profile"
                                role="tabpanel"
                                aria-labelledby="pills-edit-profile-tab"
                                tabIndex={0}
                            >
                                <h5 className='text-lg'>Company Information</h5>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="mb-20">
                                            <span className='text-xs'>Company Name</span>
                                            <p className='text-black'>Acme Corp</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="mb-20">
                                            <span className='text-xs'>Registration Number</span>
                                            <p className='text-black'>REG123456789</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="mb-20">
                                            <span className='text-xs'>Tax ID</span>
                                            <p className='text-black'>TAX123456789</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="mb-20">
                                            <span className='text-xs'>Industry</span>
                                            <p className='text-black'>Manufacturing</p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="p-5 text-center border radius-16 overflow-hidden bg-base h-100">
                    <div>
                        <h3 className='p-3 text-2xl'>Payment Due</h3>
                        <span>xxxxxx</span>
                    </div>
                </div>
            </div>

            <div className="col-lg-8">
                <div className="card h-100">
                    <div className="card-body p-24">
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="pills-edit-profile"
                                role="tabpanel"
                                aria-labelledby="pills-edit-profile-tab"
                                tabIndex={0}
                            >
                                <h5 className='text-lg'>Company Information</h5>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="mb-20">
                                            <span className='text-xs'>Contact Person</span>
                                            <p className='text-black'>Jane smith</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="mb-20">
                                            <span className='text-xs'>Position</span>
                                            <p className='text-black'>Operations Manager</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="mb-20">
                                            <span className='text-xs'>Email</span>
                                            <p className='text-black'>jane@acmecorp.com</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="mb-20">
                                            <span className='text-xs'>Phone</span>
                                            <p className='text-black'>+971 50308 5722</p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="p-5 text-center border radius-16 overflow-hidden bg-base h-100">
                    <h3 className="text-2xl mb-4">Documents</h3>

                    <div className="flex items-center justify-between gap-3 p-3 border radius-16 bg-base">
                        {/* Left Icon */}
                        <div className="text-2xl text-danger">
                            <i className="ri-file-pdf-2-line"></i>
                        </div>

                        {/* Center Text */}
                        <div className="flex-1 px-2 text-start">
                            <p className="mb-1">Business Registration</p>
                            <p className="text-sm text-muted">PDF · 2.3 MB</p>
                        </div>

                        {/* Right Icon */}
                        <div className="text-xl text-primary cursor-pointer">
                            <i className="ri-download-2-line"></i>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    );
};

export default ViewProfileLayer;