import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const InputStatus = () => {
    return (
        <div className="col-lg-12">
            <div className="card">
                
                <div className="card-body">
                    <form className="row gy-3 needs-validation" noValidate="">
                        <div className="col-md-6">
                            <label className="form-label">Application Name </label>
                                <input
                                    type="text"
                                    name="#0"
                                    className="form-control"
                                    value={"Logistics Platform"}
                                    required=""
                                />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Support Email</label>
                                <input
                                    type="text"
                                    name="#0"
                                    className="form-control"
                                    value={"support@logistics.com"}
                                    required=""
                                />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Default Currency</label>
                                <input
                                    type="text"
                                    name="#0"
                                    className="form-control"
                                    value={"USD"}
                                    required=""
                                />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Timezone</label>
                                <input
                                    type="text"
                                    name="#0"
                                    className="form-control"
                                    value={"UTC"}
                                    required=""
                                />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Order Prefix</label>
                                <input
                                    type="text"
                                    name="#0"
                                    className="form-control"
                                    value={"ORD-"}
                                    required=""
                                />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Invoice Prefix</label>
                                <input
                                    type="text"
                                    name="#0"
                                    className="form-control"
                                    value={"INV-"}
                                    required=""
                                />
                        </div>
                      
                        <div className="col-md-6">
                            <label className="form-label">Default Tax Rate (%)
                            </label>
                                <input
                                    type="text"
                                    name="#0"
                                    className="form-control"
                                    value={10}
                                    required=""
                                />
                        </div>
                      

                        <div className="col-md-6">
                            <label className="form-label">System Language</label>
                                <input
                                    type="text"
                                    name="#0"
                                    className="form-control"
                                    value={"English"}
                                    required=""
                                />
                        </div>
                      


                        <div className="col-md-6">
                            <label className="form-label">Same Emirate Delivery Fee </label>
                                <input
                                    type="text"
                                    name="#0"
                                    className="form-control"
                                    value={25}
                                    required=""
                                />
                        </div>
                      

                        <div className="col-md-6">
                            <label className="form-label">Other Emirate Delivery Fee </label>
                                <input
                                    type="text"
                                    name="#0"
                                    className="form-control"
                                    value={50}
                                    required=""
                                />
                        </div>
                      

                        <div className="col-md-6">
                            <label className="form-label">Minimum Order Amount  </label>
                                <input
                                    type="text"
                                    name="#0"
                                    className="form-control"
                                    value={100}
                                    required=""
                                />
                        </div>
                      

                        <div className="col-md-6">
                            <label className="form-label">Maximum Order Weight (kg)</label>
                                <input
                                    type="text"
                                    name="#0"
                                    className="form-control"
                                    value={500}
                                    required=""
                                />
                        </div>
                      
                        <div className="col-md-12">
                            <button className="btn btn-dark" type="submit">
                                Submit form
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InputStatus