import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/loader.json";
import {  useStore } from '../../stores/Store'
 import OrderRow from './OrderRow';


function OrdersList() {

  const {orderStore , statusStore} = useStore();
    //filter
  const [orderId , setOrderId] =  useState('');
  const [Allorder , setAllorder ] =  useState(orderStore.orders);
    

  useEffect(()=>{
      orderStore.loadOrders()
      statusStore.loadStatus()
  } , [orderStore , statusStore])

  const handleSearch = () => {
    // console.log('ffjfjf',orderStore.orders);
    // setAllorder(orderStore.orders);
    // console.log("deeee",Allorder)
    orderStore.orders= orderId;
    // console.log(orderId)
    // setAllorder(Allorder.filter(x => x.orderId == orderId))
    // console.log(Allorder)
  }

  

if(orderStore.loadingInitial) return( <div className='d-flex justify-content-center' > <Lottie   animationData={loaderAnimation} /> </div>)

    return (
        <div>
        
          <div className="card mt-4">
                  <div>
                    <input type="text" placeholder="select Project" onChange={(e) => setOrderId(e.target.value)}/>
                    <button onClick={handleSearch}>Search</button>
                  </div>
                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">OrderId</th>
                          <th scope="col">Project</th>
                          <th scope="col">Customer</th>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                          <th scope="col">Order Status</th>

                          <th scope="col">Actions</th>

                        </tr>
                      </thead>
                      <tbody>
                      
                     <OrderRow allorder={Allorder}/>

                      </tbody>
                    </table>
                  </div>
               
                </div>  
        </div>
    );
}

export default observer(OrdersList) ;