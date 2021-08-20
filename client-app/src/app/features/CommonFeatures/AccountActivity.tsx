import React from 'react'

const AccountActivity = () => {
    return (
    <div className="col-12 col-md-9 col-lg-8">
            <div className="card">
                    <div className="card-header">
                        <h4>Account Activity</h4>
                    </div>
                <div className="card-body">
                <div className="section-title">Recent activity</div>
                <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">BROWSER</th>
                          <th scope="col">IP</th>
                          <th scope="col">TIME</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Chrome on Window</th>
                          <td>192.149.122.128</td>
                          <td>11:34 PM</td>
                        </tr>
                        <tr>
                          <th scope="row">Mozilla on Window</th>
                          <td>86.188.154.225</td>
                          <td>Nov 20, 2019 10:34 PM</td>
                        </tr>
                      </tbody>
                    </table>
                </div>
            </div>
    </div>
    )
}

export default AccountActivity
