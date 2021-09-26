import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../stores/Store";
import ProductForm from "./ProductForm";
import ProductRow from "./ProductRow";

export default observer(function ProductList(){
    const {productStore , modalStore} = useStore();
    useEffect(()=>{
        productStore.loadProducts()
    } , [productStore])
    if(productStore.loadingInitial) return(<div>Loading...</div>)
    return(
        <div className="row">
           <ProductRow/>            
        </div>
    )
})