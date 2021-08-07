import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from './../stores/Store';
import { useLocation } from 'react-router-dom';

const Header = () => {

    const {userStore: {user, logout}} = useStore();
    const location = useLocation();
    const sidebarBtn = () => {
        document.body.classList.toggle('sidebar-mini');

        var dropDownMenu = document.getElementsByClassName("dropdown-menu");
        if(dropDownMenu){
            for(var i = 0; i < dropDownMenu.length ; i++){
                
                dropDownMenu[i].classList.remove('d-block');
                
            }
        }
        
    }
return (
    <nav className="navbar navbar-expand-lg main-navbar">
        <form className="form-inline mr-auto">
            <ul className="navbar-nav mr-3">
                <li><Link to="#" data-toggle="sidebar" onClick={sidebarBtn} className="nav-link nav-link-lg"><i className="fas fa-bars"></i></Link>
                </li>
                <li><Link to="#" data-toggle="search" className="nav-link nav-link-lg d-sm-none"><i
                            className="fas fa-search"></i></Link></li>
            </ul>
            <div className="search-element">
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" data-width="250" />
                <button className="btn" type="submit"><i className="fas fa-search"></i></button>
                <div className="search-backdrop"></div>
                <div className="search-result">
                    <div className="search-header">
                        Histories
                    </div>
                    <div className="search-item">
                        <Link to="#">How to hack NASA using CSS</Link>
                        <Link to="#" className="search-close"><i className="fas fa-times"></i></Link>
                    </div>
                    <div className="search-item">
                        <Link to="#">Kodinger.com</Link>
                        <Link to="#" className="search-close"><i className="fas fa-times"></i></Link>
                    </div>
                    <div className="search-item">
                        <Link to="#">#Stisla</Link>
                        <Link to="#" className="search-close"><i className="fas fa-times"></i></Link>
                    </div>
                    <div className="search-header">
                        Result
                    </div>
                    <div className="search-item">
                        <Link to="#">
                            <img className="mr-3 rounded" width="30" src="../assets/img/products/product-3-50.png"
                                alt="product"/>
                            oPhone S9 Limited Edition
                        </Link>
                    </div>
                    <div className="search-item">
                        <Link to="#">
                            <img className="mr-3 rounded" width="30" src="../assets/img/products/product-2-50.png"
                                alt="product"/>
                            Drone X2 New Gen-7
                        </Link>
                    </div>
                    <div className="search-item">
                        <Link to="#">
                            <img className="mr-3 rounded" width="30" src="../assets/img/products/product-1-50.png"
                                alt="product"/>
                            Headphone Blitz
                        </Link>
                    </div>
                    <div className="search-header">
                        Projects
                    </div>
                    <div className="search-item">
                        <Link to="#">
                            <div className="search-icon bg-danger text-white mr-3">
                                <i className="fas fa-code"></i>
                            </div>
                            Stisla Admin Template
                        </Link>
                    </div>
                    <div className="search-item">
                        <Link to="#">
                            <div className="search-icon bg-primary text-white mr-3">
                                <i className="fas fa-laptop"></i>
                            </div>
                            Create a new Homepage Design
                        </Link>
                    </div>
                </div>
            </div>
        </form>
        <ul className="navbar-nav navbar-right">
            <li className="dropdown dropdown-list-toggle">
                <Link to="#" data-toggle="dropdown" className="nav-link nav-link-lg message-toggle beep">
                    <i className="far fa-envelope"></i>
                </Link>

                <div className="dropdown-menu dropdown-list dropdown-menu-right">
                    <div className="dropdown-header">Messages
                        <div className="float-right">
                            <Link to="/">Mark All As Read</Link>
                        </div>
                    </div>
                    <div className="dropdown-list-content dropdown-list-message">
                        <Link to="/" className="dropdown-item dropdown-item-unread">
                            <div className="dropdown-item-avatar">
                                <img alt="user avatar" src="../assets/img/avatar/avatar-1.png" className="rounded-circle"/>
                                <div className="is-online"></div>
                            </div>
                            <div className="dropdown-item-desc">
                                <b>Kusnaedi</b>
                                <p>Hello, Bro!</p>
                                <div className="time">10 Hours Ago</div>
                            </div>
                        </Link>
                        <Link to="/" className="dropdown-item dropdown-item-unread">
                            <div className="dropdown-item-avatar">
                                <img alt="avatar user" src="../assets/img/avatar/avatar-2.png" className="rounded-circle"/>
                            </div>
                            <div className="dropdown-item-desc">
                                <b>Dedik Sugiharto</b>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                <div className="time">12 Hours Ago</div>
                            </div>
                        </Link>
                        <Link to="/" className="dropdown-item dropdown-item-unread">
                            <div className="dropdown-item-avatar">
                                <img alt="avatar user3" src="../assets/img/avatar/avatar-3.png" className="rounded-circle"/>
                                <div className="is-online"></div>
                            </div>
                            <div className="dropdown-item-desc">
                                <b>Agung Ardiansyah</b>
                                <p>Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <div className="time">12 Hours Ago</div>
                            </div>
                        </Link>
                        <Link to="#" className="dropdown-item">
                            <div className="dropdown-item-avatar">
                                <img alt="user 4" src="../assets/img/avatar/avatar-4.png" className="rounded-circle"/>
                            </div>
                            <div className="dropdown-item-desc">
                                <b>Ardian Rahardiansyah</b>
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit ess</p>
                                <div className="time">16 Hours Ago</div>
                            </div>
                        </Link>
                        <Link to="#" className="dropdown-item">
                            <div className="dropdown-item-avatar">
                                <img alt="user 5" src="../assets/img/avatar/avatar-5.png" className="rounded-circle"/>
                            </div>
                            <div className="dropdown-item-desc">
                                <b>Alfa Zulkarnain</b>
                                <p>Exercitation ullamco laboris nisi ut aliquip ex ea commodo</p>
                                <div className="time">Yesterday</div>
                            </div>
                        </Link>
                    </div>
                    <div className="dropdown-footer text-center">
                        <Link to="#" >View All <i className="fas fa-chevron-right"></i></Link>
                    </div>
                </div>
            </li>
            <li className="dropdown dropdown-list-toggle"><Link to="#" data-toggle="dropdown"
                    className="nav-link notification-toggle nav-link-lg beep"><i className="far fa-bell"></i></Link>
                <div className="dropdown-menu dropdown-list dropdown-menu-right">
                    <div className="dropdown-header">Notifications
                        <div className="float-right">
                            <Link to="#">Mark All As Read</Link>
                        </div>
                    </div>
                    <div className="dropdown-list-content dropdown-list-icons">
                        <Link to="#" className="dropdown-item dropdown-item-unread">
                            <div className="dropdown-item-icon bg-primary text-white">
                                <i className="fas fa-code"></i>
                            </div>
                            <div className="dropdown-item-desc">
                                Template update is available now!
                                <div className="time text-primary">2 Min Ago</div>
                            </div>
                        </Link>
                        <Link to="#" className="dropdown-item">
                            <div className="dropdown-item-icon bg-info text-white">
                                <i className="far fa-user"></i>
                            </div>
                            <div className="dropdown-item-desc">
                                <b>You</b> and <b>Dedik Sugiharto</b> are now friends
                                <div className="time">10 Hours Ago</div>
                            </div>
                        </Link>
                        <Link to="#" className="dropdown-item">
                            <div className="dropdown-item-icon bg-success text-white">
                                <i className="fas fa-check"></i>
                            </div>
                            <div className="dropdown-item-desc">
                                <b>Kusnaedi</b> has moved task <b>Fix bug header</b> to <b>Done</b>
                                <div className="time">12 Hours Ago</div>
                            </div>
                        </Link>
                        <Link to="#" className="dropdown-item">
                            <div className="dropdown-item-icon bg-danger text-white">
                                <i className="fas fa-exclamation-triangle"></i>
                            </div>
                            <div className="dropdown-item-desc">
                                Low disk space. Let's clean it!
                                <div className="time">17 Hours Ago</div>
                            </div>
                        </Link>
                        <Link to="#" className="dropdown-item">
                            <div className="dropdown-item-icon bg-info text-white">
                                <i className="fas fa-bell"></i>
                            </div>
                            <div className="dropdown-item-desc">
                                Welcome to Stisla template!
                                <div className="time">Yesterday</div>
                            </div>
                        </Link>
                    </div>
                    <div className="dropdown-footer text-center">
                        <Link to="#">View All <i className="fas fa-chevron-right"></i></Link>
                    </div>
                </div>
            </li>
            <li className="dropdown"><Link to="#" data-toggle="dropdown"
                    className="nav-link dropdown-toggle nav-link-lg nav-link-user">
                    <img alt="avatar us1" src="/assets/img/avatar/avatar-1.png" className="rounded-circle mr-1"/>
                    <div className="d-sm-none d-lg-inline-block">{`${user?.firstName} ${user?.lastName}`}</div>
                </Link>
                <div className="dropdown-menu dropdown-menu-right">
                    <div className="dropdown-title">Logged in 5 min ago</div>
                    <Link to={`${location.pathname}/profile`} className="dropdown-item has-icon">
                        <i className="far fa-user"></i> Profile
                    </Link>
                    <Link to="features-activities.html" className="dropdown-item has-icon">
                        <i className="fas fa-bolt"></i> Activities
                    </Link>
                    <Link to="features-settings.html" className="dropdown-item has-icon">
                        <i className="fas fa-cog"></i> Settings
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link to="#" onClick={logout} className="dropdown-item has-icon text-danger">
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </Link>
                </div>
            </li>
        </ul>
    </nav>
)
}

export default Header