import Lottie from "lottie-react";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../stores/Store";
import ProductForm from "./ProductForm";
import ProductRow from "./ProductRow";
import loaderAnimation from "../../assets/loader.json";

export default observer(function ProductList(){
    const {productStore , modalStore} = useStore();
    useEffect(()=>{
        productStore.loadProducts()
    } , [productStore])
    if(productStore.loadingInitial || productStore.loading) return(<div className='d-flex justify-content-center' > <Lottie   animationData={loaderAnimation} /> </div>)
    return(
        <div className="row">
           <ProductRow/>            
        </div>
    )
})