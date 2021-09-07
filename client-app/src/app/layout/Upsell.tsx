import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import UpsellForm from "../features/upsell/UpsellForm";
import UpsellList from "../features/upsell/UpsellList";
import { useStore } from "../stores/Store";
const Upsell = () =>{
    const location = useLocation();
    const {modalStore} = useStore();

    return(
        <div className="main-content">
            <section className="section">
            <div className="section-header">
                <h1>Upsell</h1>
            <div className="article-cta section-header-breadcrumb">
                <button className="btn btn-primary"  onClick={()=>modalStore.openModal(<UpsellForm />)}>Add Product</button>
            </div>
            </div> 
            <Switch>
            <Route exact path="/user/Upsell" component={UpsellList} />
            <Route key={location.key} path={['/user/Upsell/creatUpsell' , '/user/Upsell/:id']} component={UpsellForm} />
            </Switch>
            </section>
        </div>
    )
}

export default Upsell