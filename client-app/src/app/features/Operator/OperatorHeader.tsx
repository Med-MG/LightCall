import { Link } from "react-router-dom";
import { useStore } from "../../stores/Store";

const OperatorHeader = () => {
    const {userStore: {logout}} = useStore();

    return (
        <>
                <nav className="navbar navbar-expand-lg main-navbar">
                    <a href="index.html" className="navbar-brand sidebar-gone-hide">Stisla</a>
                    <div className="navbar-nav">
                    <a href="/" className="nav-link sidebar-gone-show" data-toggle="sidebar"><i className="fas fa-bars"></i></a>
                    </div>
                    <div className="nav-collapse">
                    <a className="sidebar-gone-show nav-collapse-toggle nav-link" href="/">
                        <i className="fas fa-ellipsis-v"></i>
                    </a>
                    <ul className="navbar-nav">
                        <li className="nav-item active"><a href="/" className="nav-link">Application</a></li>
                        <li className="nav-item"><a href="/" className="nav-link">Report Something</a></li>
                        <li className="nav-item"><a href="/" className="nav-link">Server Status</a></li>
                    </ul>
                    </div>
                    <ul className="navbar-nav navbar-right">
                    <li className="dropdown dropdown-list-toggle"><a href="/" data-toggle="dropdown" className="nav-link nav-link-lg message-toggle beep"><i className="far fa-envelope"></i></a>
                        <div className="dropdown-menu dropdown-list dropdown-menu-right">
                        <div className="dropdown-header">Messages
                            <div className="float-right">
                            <a href="/">Mark All As Read</a>
                            </div>
                        </div>
                        <div className="dropdown-list-content dropdown-list-message">
                            <a href="/" className="dropdown-item dropdown-item-unread">
                            <div className="dropdown-item-avatar">
                                <img alt="avatar" src="../assets/img/avatar/avatar-1.png" className="rounded-circle" />
                                <div className="is-online"></div>
                            </div>
                            <div className="dropdown-item-desc">
                                <b>Kusnaedi</b>
                                <p>Hello, Bro!</p>
                                <div className="time">10 Hours Ago</div>
                            </div>
                            </a>
                            <a href="/" className="dropdown-item dropdown-item-unread">
                            <div className="dropdown-item-avatar">
                                <img alt="avatar" src="../assets/img/avatar/avatar-2.png" className="rounded-circle" />
                            </div>
                            <div className="dropdown-item-desc">
                                <b>Dedik Sugiharto</b>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                <div className="time">12 Hours Ago</div>
                            </div>
                            </a>
                            <a href="/" className="dropdown-item dropdown-item-unread">
                            <div className="dropdown-item-avatar">
                                <img alt="avatar" src="../assets/img/avatar/avatar-3.png" className="rounded-circle" />
                                <div className="is-online"></div>
                            </div>
                            <div className="dropdown-item-desc">
                                <b>Agung Ardiansyah</b>
                                <p>Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <div className="time">12 Hours Ago</div>
                            </div>
                            </a>
                            <a href="/" className="dropdown-item">
                            <div className="dropdown-item-avatar">
                                <img alt="avatar" src="../assets/img/avatar/avatar-4.png" className="rounded-circle" />
                            </div>
                            <div className="dropdown-item-desc">
                                <b>Ardian Rahardiansyah</b>
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit ess</p>
                                <div className="time">16 Hours Ago</div>
                            </div>
                            </a>
                            <a href="/" className="dropdown-item">
                            <div className="dropdown-item-avatar">
                                <img alt="avatar" src="../assets/img/avatar/avatar-5.png" className="rounded-circle" />
                            </div>
                            <div className="dropdown-item-desc">
                                <b>Alfa Zulkarnain</b>
                                <p>Exercitation ullamco laboris nisi ut aliquip ex ea commodo</p>
                                <div className="time">Yesterday</div>
                            </div>
                            </a>
                        </div>
                        <div className="dropdown-footer text-center">
                            <a href="/">View All <i className="fas fa-chevron-right"></i></a>
                        </div>
                        </div>
                    </li>
                    <li className="dropdown dropdown-list-toggle"><a href="/" data-toggle="dropdown" className="nav-link notification-toggle nav-link-lg beep"><i className="far fa-bell"></i></a>
                        <div className="dropdown-menu dropdown-list dropdown-menu-right">
                        <div className="dropdown-header">Notifications
                            <div className="float-right">
                            <a href="/">Mark All As Read</a>
                            </div>
                        </div>
                        <div className="dropdown-list-content dropdown-list-icons">
                            <a href="/" className="dropdown-item dropdown-item-unread">
                            <div className="dropdown-item-icon bg-primary text-white">
                                <i className="fas fa-code"></i>
                            </div>
                            <div className="dropdown-item-desc">
                                Template update is available now!
                                <div className="time text-primary">2 Min Ago</div>
                            </div>
                            </a>
                            <a href="/" className="dropdown-item">
                            <div className="dropdown-item-icon bg-info text-white">
                                <i className="far fa-user"></i>
                            </div>
                            <div className="dropdown-item-desc">
                                <b>You</b> and <b>Dedik Sugiharto</b> are now friends
                                <div className="time">10 Hours Ago</div>
                            </div>
                            </a>
                            <a href="/" className="dropdown-item">
                            <div className="dropdown-item-icon bg-success text-white">
                                <i className="fas fa-check"></i>
                            </div>
                            <div className="dropdown-item-desc">
                                <b>Kusnaedi</b> has moved task <b>Fix bug header</b> to <b>Done</b>
                                <div className="time">12 Hours Ago</div>
                            </div>
                            </a>
                            <a href="/" className="dropdown-item">
                            <div className="dropdown-item-icon bg-danger text-white">
                                <i className="fas fa-exclamation-triangle"></i>
                            </div>
                            <div className="dropdown-item-desc">
                                Low disk space. Let's clean it!
                                <div className="time">17 Hours Ago</div>
                            </div>
                            </a>
                            <a href="/" className="dropdown-item">
                            <div className="dropdown-item-icon bg-info text-white">
                                <i className="fas fa-bell"></i>
                            </div>
                            <div className="dropdown-item-desc">
                                Welcome to Stisla template!
                                <div className="time">Yesterday</div>
                            </div>
                            </a>
                        </div>
                        <div className="dropdown-footer text-center">
                            <a href="/">View All <i className="fas fa-chevron-right"></i></a>
                        </div>
                        </div>
                    </li>
                    <li className="dropdown"><a href="/" data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user">
                        <img alt="avatar" src="../assets/img/avatar/avatar-1.png" className="rounded-circle mr-1" />
                        <div className="d-sm-none d-lg-inline-block">Hi, Ujang Maman</div></a>
                        <div className="dropdown-menu dropdown-menu-right">
                        <div className="dropdown-title">Logged in 5 min ago</div>
                        <a href="features-profile.html" className="dropdown-item has-icon">
                            <i className="far fa-user"></i> Profile
                        </a>
                        <a href="features-activities.html" className="dropdown-item has-icon">
                            <i className="fas fa-bolt"></i> Activities
                        </a>
                        <a href="features-settings.html" className="dropdown-item has-icon">
                            <i className="fas fa-cog"></i> Settings
                        </a>
                        <div className="dropdown-divider"></div>
                        <Link to='#' onClick={logout} className="dropdown-item has-icon text-danger">
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </Link>
                        </div>
                    </li>
                    </ul>
                </nav>

                <nav className="navbar navbar-secondary navbar-expand-lg">
                    <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                        <a href="/" data-toggle="dropdown" className="nav-link has-dropdown"><i className="fas fa-fire"></i><span>Dashboard</span></a>
                        <ul className="dropdown-menu">
                            <li className="nav-item"><a href="index-0.html" className="nav-link">General Dashboard</a></li>
                            <li className="nav-item"><a href="index.html" className="nav-link">Ecommerce Dashboard</a></li>
                        </ul>
                        </li>
                        <li className="nav-item active">
                        <a href="/" className="nav-link"><i className="far fa-heart"></i><span>Top Navigation</span></a>
                        </li>
                        <li className="nav-item dropdown">
                        <a href="/" data-toggle="dropdown" className="nav-link has-dropdown"><i className="far fa-clone"></i><span>Multiple Dropdown</span></a>
                        <ul className="dropdown-menu">
                            <li className="nav-item"><a href="/" className="nav-link">Not Dropdown Link</a></li>
                            <li className="nav-item dropdown"><a href="/" className="nav-link has-dropdown">Hover Me</a>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><a href="/" className="nav-link">Link</a></li>
                                <li className="nav-item dropdown"><a href="/" className="nav-link has-dropdown">Link 2</a>
                                <ul className="dropdown-menu">
                                    <li className="nav-item"><a href="/" className="nav-link">Link</a></li>
                                    <li className="nav-item"><a href="/" className="nav-link">Link</a></li>
                                    <li className="nav-item"><a href="/" className="nav-link">Link</a></li>
                                </ul>
                                </li>
                                <li className="nav-item"><a href="/" className="nav-link">Link 3</a></li>
                            </ul>
                            </li>
                        </ul>
                        </li>
                    </ul>
                    </div>
                </nav>
      </>
    )
}

export default OperatorHeader