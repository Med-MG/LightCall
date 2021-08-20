import React from 'react'
import { Link } from 'react-router-dom';

const SecuritySettings = () => {
    return (
<div className="col-12 col-md-9 col-lg-8">
                <div className="card">
                  <div className="card-header">
                    <h4>Security Settings</h4>
                  </div>
                  <div className="card-body">
                    <div className="list-group">
                      <Link to="#" className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">Change Password</h5>
                          <small>Last changed: Oct 2, 2019</small>
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                          <p className="mb-1">Set a unique password to protect your account.</p>
                          <button className="btn btn-primary">Change Password</button>
                        </div>
                      </Link>
                      <Link to="#" className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">2FA Authentication <span className="badge badge-success">Enabled</span> </h5>
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                          <p className="mb-1">Secure your account with 2FA security. When it is activated you will need to enter not only your password, but also a special code using app. You can receive this code by in mobile app.</p>
                          <button className="btn btn-danger ml-4" style={{height: "max-content"}}>Disable</button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
    )
}

export default SecuritySettings
