import React from 'react'
import { Link } from 'react-router-dom';
import { history } from '../../..';
import { useStore } from './../../stores/Store';
import BreadCrums from './../../common/BreadCrums/BreadCrums';

const Profile = () => {
    const {userStore: {user}} = useStore();
    return (
        <div className="main-content">
            <div className="section">
                <div className="section-header">
                <div className="section-header-back">
                    <button onClick={()=> { history.goBack() }} className="btn btn-icon"><i className="fas fa-arrow-left"></i></button>
                </div>
                <h1><i className="fa fa-user"></i> &nbsp;Profile Settings</h1>
                    <div className="section-header-breadcrumb">
                            <BreadCrums />
                    </div>
                </div>
                <div className="section-body">
                    <h2 className="section-title">Hi, {`${user?.firstName} ${user?.lastName}`}</h2>
                    <p className="section-lead">
                        Change information about yourself on this page.
                    </p>
                    <div className="col-md-4">
                        <div className="card author-box card-primary">
                            <div className="card-body">
                                <div className="author-box-left">
                                    <img alt="profile" src="../assets/img/avatar/avatar-1.png" className="rounded-circle author-box-picture"/>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="author-box-details">
                                    <div className="author-box-name">
                                        <Link to="/">{`${user?.firstName} ${user?.lastName}`}</Link>
                                        <div className="text-muted d-inline font-weight-normal"><div className="slash"></div> web developer</div>
                                    </div>
                                    <div className="author-box-description">
                                    <div className="d-flex">
                                        <div className="font-weight-600">Last Login</div>
                                        <div className="bullet"></div>
                                        <div className="text-primary font-weight-600">06-29-2020 02:39pm</div>
                                    </div>

                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <ul className="nav nav-pills flex-column">
                                <li className="nav-item">
                                    <a href="#" className="nav-link active"><i className="fas fa-user-cog"></i> Personal Information</a>
                                </li>
                                <li className="nav-item"><a href="#" className="nav-link"><i className="fas fa-shield-alt"></i> Security Settings</a></li>
                                <li className="nav-item"><a href="#" className="nav-link"><i className="fas fa-bell"></i> Notifications</a></li>
                                <li className="nav-item"><a href="#" className="nav-link"><i className="fab fa-buffer"></i> Account Activity</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
