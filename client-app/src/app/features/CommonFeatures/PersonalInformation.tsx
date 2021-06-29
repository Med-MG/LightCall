import React from 'react'
import { useState } from 'react';
import TimezoneSelect from 'react-timezone-select';


const PersonalInformation = () => {
  const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    return (
<div className="col-12 col-md-9 col-lg-8">
                <div className="card">
                  <form method="post" className="needs-validation" >
                    <div className="card-header">
                      <h4>Edit Profile</h4>
                    </div>
                    <div className="card-body">
                        <div className="section-title">Personal information</div>
                        <div className="row">
                          <div className="form-group col-md-6 col-12">
                            <label>First Name</label>
                            <input type="text" className="form-control" value="Ujang" />
                            <div className="invalid-feedback">
                              Please fill in the first name
                            </div>
                          </div>
                          <div className="form-group col-md-6 col-12">
                            <label>Last Name</label>
                            <input type="text" className="form-control" value="Maman" />
                            <div className="invalid-feedback">
                              Please fill in the last name
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-7 col-12">
                            <label>Email</label>
                            <input type="email" className="form-control" value="ujang@maman.com" />
                            <div className="invalid-feedback">
                              Please fill in the email
                            </div>
                          </div>
                          <div className="form-group col-md-5 col-12">
                            <label>Phone</label>
                            <input type="tel" className="form-control" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group mb-0 col-12">
                            <label>Address</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="section-title">Preferences</div>
                        <div className="row">
                        <div className="form-group col-12">
                          <label>Date Format</label>
                          <select className="form-control form-control-sm">
                            <option>d-m-y (29-06-2021)</option>
                            <option>d/m/y (29/06/2021)</option>
                            <option>d M Y (29 jun 2021)</option>
                          </select>
                        </div>
                        <div className="form-group col-12">
                          <label>Timezone</label>
                          <TimezoneSelect 
                            value={selectedTimezone}
                            onChange={setSelectedTimezone}
                          />
                        </div>
                        </div>
                    </div>
                    <div className="card-footer text-right">
                      <button className="btn btn-primary">Save Changes</button>
                    </div>
                  </form>
                </div>
              </div>
    )
}

export default PersonalInformation
