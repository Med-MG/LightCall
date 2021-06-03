import { Route, Switch } from 'react-router'
import { useLocation } from 'react-router-dom'
import ShippingCompanyForm from '../features/shippingCompany/ShippingCompantForm';
import ShippingCompanyList from '../features/shippingCompany/ShippingCompanyList';

const ShippingCompany = () => {
    const location = useLocation();
    return (
        <div className="main-content">
        <section className="section">
        <div className="section-header">
            <h1>shipping Company</h1>
          </div> 
          <Switch>
          <Route exact path="/shippingCompany" component={ShippingCompanyList} />
          <Route key={location.key} path={['/shippingCompany/creat_shipping_Company' , '/shippingCompany/:id']} component={ShippingCompanyForm} />
         </Switch>
        </section>
      </div>
      
    )
}

export default ShippingCompany