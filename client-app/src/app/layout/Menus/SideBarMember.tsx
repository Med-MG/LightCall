import { Link } from "react-router-dom"

const SideBarMember = () => {
    return (
        <>
        <ul className="sidebar-menu">
            <li className="menu-header">Menu</li>
            <li className="">
                <Link to="/user/dashboard" className="nav-link" id="dashboard" ><i className="fas fa-user-secret"></i> <span>Dashboard</span></Link>
            </li>
            <li className="">
                <Link to="/overview" className="nav-link" id="overview" ><i className="fas fa-user-secret"></i> <span>Overview</span></Link>
            </li>
            <li className="">
                <Link to="/user/errTest" className="nav-link" id="overview" ><i className="fas fa-user-secret"></i> <span>Errors</span></Link>
            </li>
            <li className="">
                <Link to="/account" className="nav-link" id="account" ><i className="fas fa-user-secret"></i> <span>My Account</span></Link>
            </li>
            <li className="menu-header">Services</li>
            <li className="">
                <Link to="/user/projects" className="nav-link" id="projects" ><i className="fas fa-user-secret"></i> <span>Projects</span></Link>
            </li>
            <li className="">
                <Link to="/user/products" className="nav-link" id="projects" ><i className="fas fa-user-secret"></i> <span>Products</span></Link>
            </li>
            <li className="">
                <Link to="/upsellManager" className="nav-link" id="upsellManager" ><i className="fas fa-user-secret"></i> <span>Upsell Manager</span></Link>
            </li>
            <li className="">
                <Link to="/whatsappTemplate" className="nav-link" id="whatsappTemplate" ><i className="fas fa-user-secret"></i> <span>Whatsapp Template</span></Link>
            </li>
            <li className="">
                <Link to="/smsCampaign" className="nav-link" id="smsCampaign" ><i className="fas fa-sms"></i> <span>SMS</span></Link>
            </li>
            <li className="">
                <Link to="/ivruser" className="nav-link" id="ivruser" ><i className="fas fa-user-secret"></i> <span>IVR System</span></Link>
            </li>
            <li className="menu-header">Settings</li>
            <li className="">
                <Link to="/paymentHistory" className="nav-link" id="paymentHistory" ><i className="fas fa-user-secret"></i> <span>Payment History</span></Link>
            </li>
            <li className="">
                <Link to="/invoicesUser" className="nav-link" id="invoicesUser" ><i className="fas fa-user-secret"></i> <span>Invoices</span></Link>
            </li>
            <li className="">
                <Link to="/support" className="nav-link" id="support" ><i className="fas fa-user-secret"></i> <span>Support</span></Link>
            </li>
            <li className="">
                <Link to="/faq" className="nav-link" id="faq" ><i className="fas fa-user-secret"></i> <span>FAQs</span></Link>
            </li>
            <li className="">
                <Link to="/contact" className="nav-link" id="contact" ><i className="fas fa-user-secret"></i> <span>Contact</span></Link>
            </li>
    </ul>
    <div className="mt-4 mb-4 p-3 hide-sidebar-mini">
              <Link to="/settings" id="settings" className="btn btn-primary btn-lg btn-block btn-icon-split">
                <i className="fas fa-rocket"></i> Settings
              </Link>
    </div>
    </>
    )
}

export default SideBarMember
