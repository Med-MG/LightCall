import React from 'react'
import OrderSheetForm from '../features/order/OrderSheetForm'

import OrderList from '../features/order/OrdersList'


const Orders = () => {
    return (
      <div className="main-content">
        <section className="section">
          <div className="section-header">
              <h1>Orders</h1>
          </div> 
          <OrderSheetForm/>
          <OrderList/>
        </section>
      </div>
    )
}

export default Orders
