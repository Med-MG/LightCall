import React from 'react'

const NotificationsSettings = () => {
    return (
        <div className="col-12 col-md-9 col-lg-8">
            <div className="card">
                <div className="card-header">
                    <h4>Notification Settings</h4>
                </div>
                <div className="card-body">
                <div className="section-title">Security Alerts</div>
                    <div className="form-group">
                      <div className="control-label">You will get only those email notification what you want.</div>
                      <label className="mt-4">
                        <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input"/>
                        <span className="custom-switch-indicator"></span>
                        <span className="custom-switch-description" style={{fontSize: "1rem"}}>Email me if new browser is used to sign in</span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="">
                        <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input"/>
                        <span className="custom-switch-indicator"></span>
                        <span className="custom-switch-description" style={{fontSize: "1rem"}} >Email me whenever encounter unusual activity</span>
                      </label>
                    </div>
                  </div>
                </div>
            </div>
    )
}

export default NotificationsSettings
