import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/loader.json";
import {  useStore } from '../../stores/Store'
 import OrderRow from './OrderRow';
 import Select from 'react-select';


function OrdersList() {

  const {orderStore , projectStore ,statusStore} = useStore();
    //filter
  const [orderId , setOrder] =  useState(["" , ""]);
  const [Allorder , setAllorder ] =  useState(orderStore.orders);

  //get all project
    const {projects} = projectStore;
    var ProjecttName=[{}]

    useEffect(()=>{
      projectStore.loadProjects();
    } , [projectStore])

    projects.map(project =>{
      ProjecttName.push({
        value:project.id,
        label:project.project_Type
      })
    })

  useEffect(()=>{
      orderStore.loadOrders()
      statusStore.loadStatus()
  } , [orderStore , statusStore])

  const handleSearch = () => {
    // console.log('ffjfjf',orderStore.orders);
    // setAllorder(orderStore.orders);
    // console.log("deeee",Allorder)
    console.log('ddddd',orderId);
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
                    <input type="text" placeholder="select Project" name="ProjectName" onChange={(e) => setOrder([e.target.value , e.target.name])}/>
                    {/* <Select options={ProjecttName} placeholder="select Project" name="ProjectName" onChange={(e) => setOrder([e?.value , e.target.name])} /> */}
                    {/* <input type="date" placeholder="YY/MM/DD" name="Date" onChange={(e) => setOrder([e.target.value , e.target.name])}/> */}
                    <input type="text" placeholder="Customer" name="Costumer" onChange={(e) => setOrder([e.target.value , e.target.name])}/>

                    <input type="text" placeholder="Phone" name="Phone" onChange={(e) => setOrder([e.target.value , e.target.name])}/>
                    <input type="text" placeholder="Select Status" name="OrderStatus" onChange={(e) => setOrder([e.target.value , e.target.name])}/>
                    <input type="text" placeholder="select City" name="City" onChange={(e) => setOrder([e.target.value , e.target.name])}/>
                    <input type="text" placeholder="select Product" name="Product" onChange={(e) => setOrder([e.target.value , e.target.name])}/>
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