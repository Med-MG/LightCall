import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/loader.json";
import {  useStore } from '../../stores/Store'
 import OrderRow from './OrderRow';
 import Select from 'react-select';


function OrdersList() {

  const {orderStore , projectStore ,statusStore , productStore , cityStore} = useStore();
    //filter
  const [filters , setfilters] =  useState(new Map());
  const [Allorder , setAllorder ] =  useState(orderStore.orders);
  const {status  , loadStatus   } = statusStore
  const {products , loadProducts    } = productStore
  const {cities  , laodCities   } = cityStore
  const {projects , loadProjects } = projectStore;

  

  useEffect(()=>{
      orderStore.loadOrders()
      loadStatus()
      loadProjects();
      loadProducts()
      laodCities()

  } , [orderStore , statusStore , projectStore])

  const handleSearch = (e) => {

    if(e.target.value == '' || e.target.value == '-1' ){
      filters.delete(e.target.name)
    }else{
      filters.set(e.target.name , e.target.value)
    }

   orderStore.orders = filters ;

  }
  

if(orderStore.loadingInitial) return( <div className='d-flex justify-content-center' > <Lottie   animationData={loaderAnimation} /> </div>)

    return (
        <div>
        
        <div  >
        <div className="d-flex justify-content-around mb-3 " >
                  <select className="form-control mr-4 " name="project" onChange={(e) => handleSearch(e)} >
                  <option key={0}  value={-1}> Select Project</option>
                      {projects.map((pro) =>{
                      return <option key={pro.id}  value={pro.id}> {pro.project_Type}</option>
                      })}
                      </select>

                    <input type="text" className="form-control  mr-4 " placeholder="Customer" name="costumer" onChange={(e) => handleSearch(e)}/>

                    <input type="text" className="form-control " placeholder="Phone" name="phone" onChange={(e) => handleSearch(e) }/>
                    
                    </div>
                    <div className="d-flex justify-content-around  " >
                      <select className="form-control  mr-4" name="status" onChange={(e) => handleSearch(e)} >
                      <option key={0}  value={-1}> Select Status</option>
                      {status.map((status) =>{
                      return <option key={status.id}  value={status.id}> {status.statusType}</option>
                      })}
                      </select>
       
                      <select className="form-control  mr-4" name="city" onChange={(e) => handleSearch(e)} >
                      <option key={0}  value={-1}> Select City</option>
                      {cities.map((city) =>{
                      return <option key={city.id}  value={city.cityName}> {city.cityName}</option>
                      })}
                      </select>

                      <select className="form-control" name="product" onChange={(e) => handleSearch(e)} >
                      <option key={0}  value={-1}> Select Product</option>
                      {products.map((pro) =>{
                      return <option key={pro.id}  value={pro.id}> {pro.name}</option>
                      })}
                      </select>
                      </div>

                    {/* <button onClick={handleSearch}>Search</button> */}
                  </div>
        
          <div className="card mt-4">

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
                      
                    <OrderRow />

                      </tbody>
                    </table>
                  </div>
              
                </div>  
        </div>
    );
}

export default observer(OrdersList) ;