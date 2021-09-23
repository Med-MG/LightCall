import Lottie from 'lottie-react';
import { useEffect } from 'react';
import { Redirect, Route , Switch } from 'react-router';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';
import HomePage from '../features/home/HomePage';
import { useStore } from '../stores/Store';
import Page403 from '../security/Page403';
import { observer } from 'mobx-react-lite';
import loaderAnimation from "../assets/loader.json";
import OperatorDashoard from '../features/Operator/OperatorDashoard';
import Main from '../features/Admin/Main';
import ManageOperator from './../features/Admin/ManageOperator';
import Status from './Status'
import Orders from './Orders'
import Projects from './Projects'
import Operator from './Operator'
import AdminLayout from './AdminLayout';
import OperatorLayout from '../features/Operator/OperatorLayout';
import PrivateAdminRoute from '../security/PrivateAdminRoute';
import "../assets/style.css";
import "../assets/custom.css";
import "../assets/components.css";
import PublicRoute from '../security/PublicRoute';
import PrivateOperatorRoute from '../security/PrivateOperatorRoute';
import NotFound404 from './../security/NotFound404';
import TestError from './../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import ServerError from './../features/errors/ServerError';
import ModalContainer from '../common/modals/ModalContainer';
import ProjectsList from '../features/project/ProjectsList';
import ProjectForm from '../features/project/ProjectForm';
import Profile from '../features/CommonFeatures/Profile';
import ProductForm from '../features/product/ProductForm';
import OrderSheet from '../features/order/OrderSheetForm';
import Product from './Product';
import UsersDashboard from './../features/Member/UsersDashboard';
import Upsell from './Upsell';
import Sms from './Sms';
import WhatTemp from './WhatTemp';


function App() {
  const {userStore, commonStore: {setApploaded, token, appLoaded}} = useStore();

  useEffect(() => {
   if(token){
     userStore.getUser().finally(() => setApploaded());
   }else {
     setApploaded();
   }
  }, [setApploaded, token, userStore])

  if(!appLoaded) return( <div className='d-flex justify-content-center' > <Lottie  animationData={loaderAnimation} /> </div>)

  
  return (
    <>
    <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <ModalContainer/>
    <div id="app">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path='/register' component={RegisterPage}  />
          <Route path='/login' component={LoginPage} />
          <Route path='/RestrictedAccess' component={Page403} />
          <Route path='/server-error' component={ServerError} />
          
          <Route path='/admin/:path?' exact>
              <AdminLayout>
                <Switch>
                  <PrivateAdminRoute path='/admin' exact component={Main} />
                  <PrivateAdminRoute path='/admin/settings' component={Main} />
                  <PrivateAdminRoute path="/admin/orders" component={Orders}  />
                  <PrivateAdminRoute path="/admin/projects" component={ProjectsList}  />
                  <PrivateAdminRoute path="/admin/projForm" component={ProjectForm}  />
                  <PrivateAdminRoute path="/admin/status" component={Status}/>
                  <PrivateAdminRoute path="/operateur" component={Operator}/>  
                  <PrivateAdminRoute path='/admin/manageOperators' component={ManageOperator} />
                  <PrivateAdminRoute path='/admin/profile' component={Profile} />
                  
                  <Route path="*" >
                    <Redirect to="/404" />
                  </Route> 
                </Switch>
              </AdminLayout>
          </Route>

          <Route path='/operator/:path?' exact>
              <OperatorLayout>
                <Switch>
                  <PrivateOperatorRoute path='/operator' exact component={OperatorDashoard} />
                  <PrivateOperatorRoute path='/operator/settings' component={OperatorDashoard} />
                  <PrivateOperatorRoute path="/operator/status" component={Status}/>
                  <PrivateOperatorRoute path="/operator/sms" component={Sms}/>
                  <PrivateOperatorRoute path="/operator/whatsapp" component={WhatTemp}/>

                  <Route path="*" >
                    <Redirect to="/404" />
                  </Route> 
                </Switch>
              </OperatorLayout>
          </Route>

          <Route path='/user/:path?'>
      
              <AdminLayout>
                <Switch>
                  <PublicRoute path='/user' exact component={UsersDashboard} />
                  <PublicRoute path="/user/orders" component={Orders}  />
                  <PublicRoute path="/user/orderssheet" component={OrderSheet} />
                  <PublicRoute path="/user/projects" component={Projects}   />  
                  {/* Product Route */}
                  <PublicRoute path="/user/products/:id" component={ProductForm}   />
                  <PublicRoute path="/user/products" component={Product}   />
                  <PublicRoute path="/user/upsell" component={Upsell} /> 

                  <Route path="/user/errTest" component={TestError} />
                  <Route path="/user/profile" component={Profile} />
                  <Route path="*" >
                    <Redirect to="/404" />
                  </Route> 
                </Switch>
              </AdminLayout>
              {/* <Route path="/404" exact component={NotFound404} /> */}
          </Route>
          
          <Route >
            <Switch>
                <Route path="/404"  component={NotFound404} />
                <Redirect to="/404" />
            </Switch>
          </Route>

          {/* <Route path='*' exact={true}>
            <Switch>
                  <Route path="/404" component={NotFound404} />
                  <Redirect to="/404" />
            </Switch>
          </Route> */}
          {/* <Route path='*' exact  component={NotFound404} /> */}



          {/* <Route path="/OperatorDashboard" component={OperatorDashoard} /> */}
          {/* <Route  exact component={Layout} /> */}
          {/* <Route exact path="/manageOperators" component={ManageOperator}  />
          <PivateLayout exact path="/Admindashboard" component={Main} />
          <Route exact path="/orders" component={Orders} />
          <Route path="/status" component={Status} /> 
          <PivateLayout exact path="/orders" component={Orders} />
          <PivateLayout path="/status" component={Status} /> 
          <PivateLayout path="/upsell" component={Upsell} /> 
          {/* <PivateLayout path="/operateur" component={Operateur}/> */}
          {/* <PivateLayout path="/shippingCompany" component={ShippingCompany}/>
          <PivateLayout path="/cities" component={City}/>
          <PivateLayout  path="/projects" component={Projects} />
          <PivateLayout path="/operateur" component={Operator}/>
          <PivateLayout path="/products" component={Product}/> */}

        </Switch>
    </div>
    </>
  );
}

export default observer(App);
