 import { observer } from 'mobx-react-lite';
import React , {useState , SyntheticEvent} from 'react';
import { ChangeEvent } from 'react';
import { Order } from '../../models/Order';
import { useStore } from '../../stores/Store';



function OrderRow( ) {

  const [target, setTarget] = useState('');
  const {orderStore , statusStore} = useStore();
  const {orders , deleteOrder , loading , ordersRegistry , updateOrder , orderFiler} = orderStore
  const {status  , statusRegistry  } = statusStore
  console.log(orders);


  const handleOrderDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setTarget(id);
    deleteOrder(id)
  }
  const StatusChange = (e: ChangeEvent<HTMLSelectElement> , id : string) => {
    var statusId = e.target.value;
    var order = ordersRegistry.get(id)
    var status = statusRegistry.get(statusId)
    order!.status = status! 

    updateOrder(order!);
  }


    return ( 
        <>
        {/* {console.log('testtt',props.allorder)} */}
        {orders.map((order)=> {
         return ( 
        <tr key={order.id}>
        <td>{order.orderId}</td>
        <td>{order.project?.project_Type}</td>
        <td>{order.customer?.fullName}</td>
        <td>{order.product[0]?.name}</td>
        <td>{order.price}</td>
        <td>
          {/* {order.status?.statusType} */}
        <div>
                      <select className="form-control"  onChange={(e)=>StatusChange(e , order.id)}>
                      {status.map((status) =>{

                        if(status.id === order.status?.id)return(<option key={status.id} selected  value={status.id}> {status.statusType}</option>)
                        else return(<option key={status.id}  value={status.id}> {status.statusType}</option>)
                      })}
                      </select>
        </div>
        </td>
        <td>
          <div>
            <button  className={`btn btn-danger ${loading && target === order.id ? "btn-progress" : ""}`} color='red' onClick={(e)=> handleOrderDelete( e ,order.id) }>Delete</button>
          </div>
          </td>
      </tr>)}

        )}


      </>
    );
}

 export default observer(OrderRow);