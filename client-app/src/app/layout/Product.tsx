import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import ProductForm from "../features/product/ProductForm";
import ProductList from "../features/product/ProductList";
import { useStore } from "../stores/Store";

const Product = () => {
    const {productStore , modalStore} = useStore();
    const location = useLocation();
    return (
        <div className="main-content">
        <section className="section">
        <div className="section-header">
            <h1>Products</h1>
            <div className="article-cta section-header-breadcrumb">
                <button className="btn btn-primary"  onClick={()=>modalStore.openModal(<ProductForm />)}>Add Product</button>
             </div>
          </div> 
          <Switch>
           <Route exact path="/user/products" component={ProductList} />
           <Route key={location.key} path={['/user/products/creat' , '/user/products/:id']} component={ProductForm} />
         </Switch>
        </section>
      </div>
      
    )
}
export default Product