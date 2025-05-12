import React from 'react';

const ViewProfileLayer = () => {
    return (
        <div className="row gy-4">

            {/* Left Main Info */}
            <div className="col-lg-8">
                <div className="card h-100">
                    <div className="card-body p-24">
                        <h5 className='text-lg mb-4'>Company Information</h5>
                        <div className="row">
                            <div className="col-sm-6 mb-3">
                                <span className='text-xs'>Company Name</span>
                                <p className='text-black'>Acme Corp</p>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <span className='text-xs'>Registration Number</span>
                                <p className='text-black'>REG123456789</p>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <span className='text-xs'>Tax ID</span>
                                <p className='text-black'>TAX987654321</p>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <span className='text-xs'>Industry</span>
                                <p className='text-black'>Manufacturing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Payment Box */}
            <div className="col-lg-4">
                <div className="p-5 text-center border radius-16 bg-base h-100">
                    <h3 className='text-2xl mb-2'>Payment Due</h3>
                    <span className="text-lg text-danger">XXXX</span>
                </div>
            </div>

            {/* Left Contact Info */}
            <div className="col-lg-8">
                <div className="card h-100">
                    <div className="card-body p-24">
                        <h5 className='text-lg mb-5'>Contact Information</h5>
                        <div className="row">
                            <div className="col-sm-6 mb-3">
                                <span className='text-xs'>Contact Person</span>
                                <p className='text-black'>Jane Smith</p>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <span className='text-xs'>Position</span>
                                <p className='text-black'>Operations Manager</p>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <span className='text-xs'>Email</span>
                                <p className='text-black'>jane@acmecorp.com</p>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <span className='text-xs'>Phone</span>
                                <p className='text-black'>+1 234 567 8900</p>
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
                        <div style={{display:'flex'}} className="mb-3 flex items-center gap-3 p-3 border radius-16 bg-base">
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

                        <div style={{display:'flex'}} className="flex items-center  gap-3 p-3 border radius-16 bg-base">
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
                    </div>
                </div>
            </div>

            {/* Left Address */}
            <div className="col-lg-8">
                <div className="card h-100">
                    <div className="card-body p-24">
                        <h5 className='text-lg mb-4'>Address</h5>
                        <p className='text-black mb-1'>123 Business Street</p>
                        <p className='text-black mb-1'>Suite 456</p>
                        <p className='text-black mb-1'>New York, NY 10001</p>
                        <p className='text-black'>United States</p>
                    </div>
                </div>
            </div>

            {/* Right Registration Details */}
            <div className="col-lg-4">
                <div className="p-5 border radius-16 bg-base h-100">
                    <h3 className='text-xl mb-3'>Registration Details</h3>
                    <span className='text-xs'>Registered At</span>
                    <p className='text-black mb-3'>2025-04-15 14:30:00</p>

                    <span className='text-xs'>Status</span>
                    <p className='text-black mb-3'>Pending Approval</p>

                    <span className='text-xs'>Last Updated</span>
                    <p className='text-black'>2025-04-16 09:15:00</p>
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
                            <div className="col"><strong>Total Revenue</strong></div>
                            <div className="col"><strong>Total Orders</strong></div>
                            <div className="col"><strong>Total RTO</strong></div>
                            <div className="col"><strong>RTO/Delivery Ratio</strong></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ViewProfileLayer;
