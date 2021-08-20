import React , {useState , useEffect} from 'react';
import { useStore } from '../../stores/Store';
import { Radio, RadioGroup  } from "react-radio-group";
import { observer } from 'mobx-react-lite';
import Lottie from 'lottie-react';
import OrderLottie from '../../assets/order.json';
import loaderAnimation from "../../assets/loader.json";
import PopupForm from '../../common/form/PopupForm'; 




function OperatorOrder() {

    const {orderStore , statusStore ,  } = useStore()
    const {assignedOrder , AssigneOrder , updateOrder ,UpdateOperateur} = orderStore
    const {status  , loadStatus , statusRegistry  } = statusStore
    var [autoPlay , setAutoPlay] = useState(false)
    var [isAnimated , setIsAnimated] = useState(false)
  
  


    useEffect(()=>{
      AssigneOrder()
      loadStatus()
     
  } , [ orderStore, statusStore])

    const onChange = id  => {

    var status = statusRegistry.get(id)
    assignedOrder.status = status;
    updateOrder(assignedOrder);

    };

    const onSubmit = ()  => {

    setAutoPlay(true);
    setIsAnimated(true);
  
    setTimeout(()=>{
      UpdateOperateur()
      AssigneOrder();
      setAutoPlay(false);
      setIsAnimated(false);
    } , 2000)
        
      };
  

    if(statusStore.loadingInitial || orderStore.loadingInitial) return( <div className='d-flex justify-content-center' > <Lottie   animationData={loaderAnimation} /> </div>)


    if(assignedOrder == undefined) return( <div className="card p-2 order-card ">
    <div className="card-body">
      <h1 className="text-center" >There no orders Assigned</h1>
      </div>
      </div>)

    return (
      <div className="card p-2 order-card ">
      <div className="card-body">
      <h2 className={`new-order-text text-center mb-3 ${!isAnimated ? "" : "animated"}`} >New Order</h2>
            <div  className="d-flex text-center justify-content-around align-items-center new-order" >
              <div className={!isAnimated ? "order-animation" : 'order-animation animated'}  >
                
            <Lottie loop={false}  autoplay={autoPlay} animationData={OrderLottie}  />
            </div>
            <div  className={!isAnimated ? "text-left order-info mt-2" : 'text-left order-info m-2 animated'}>
              <div>
                <h4>FullName : <PopupForm for="fullname" type="text" value={assignedOrder?.customer?.fullName} /> </h4>
                <h4>Adresse  : <PopupForm for="adresse" type="text" value={assignedOrder?.customer?.fullAdresse} /> </h4>
                <h4>Email    : <PopupForm for="email" type="text" value={assignedOrder?.customer?.email} /></h4>
                <h4>Phone    : <PopupForm for="phone" type="text" value={assignedOrder?.customer?.phone} /></h4>
                <h4>Product  : <span>{assignedOrder?.product[0]?.name}</span></h4>
                <h4>Quantity : <span>{assignedOrder?.product[0]?.quantity}</span></h4>
                <h4>Price    : <PopupForm for="price" type="number"  value={assignedOrder?.price}/> MAD</h4>
              </div>

            </div>

            </div>

      </div>
      <div className={`card-footer d-flex justify-content-around flex-wrap status-btns ${!isAnimated ? "" : "animated"}`  }>


{status.map(status => {

return (
                  <button
                  className="btn btn-primary m-1 mb-2 selected"
                  value={status?.id}
                  
                  style={{
                    backgroundColor: `${status?.id == assignedOrder?.status?.id ? "#394eea" : "#a0aaf5"}`
                  }}

                  

                  onClick={()=>onChange(status?.id)}
                >
                  {status?.statusType}
                </button>)})}

      </div>
      <hr hidden={isAnimated} ></hr>
        <div  className={`ml-auto  pr-5 submit-order ${!isAnimated ? "" : "animated"}`} >
          <button className="btn btn-success m-1 btn-lg mb-2 " onClick={onSubmit}>
          Submit
          </button>
        </div>
      </div>
    );
}

export default observer(OperatorOrder) ;

















