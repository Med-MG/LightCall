import React , {useState , useEffect} from 'react';
import { useStore } from '../../stores/Store';
import { Radio, RadioGroup  } from "react-radio-group";
import { observer } from 'mobx-react-lite';
import Lottie from 'lottie-react';
import OrderLottie from '../../assets/order.json';
import loaderAnimation from "../../assets/loader.json";
import PopupForm from '../../common/form/PopupForm'; 
import NewOrderPopup from '../../common/modals/NewOrderPopup';




function OperatorOrder() {

    const {orderStore , statusStore ,  } = useStore()
    const {assignedOrder , AssigneOrder , updateOrder ,UpdateOperateur , OperateurStatus ,InAssigneOrder } = orderStore
    const {status  , loadStatus , statusRegistry  } = statusStore
    var [autoPlay , setAutoPlay] = useState(false)
    var [isAnimated , setIsAnimated] = useState(false)
    var [timer , setTimer] = useState(100)

    useEffect(() => {
      console.log(localStorage.getItem("timer"));
      setTimer(localStorage.getItem("timer"));
    },[] );
  
    useEffect(() => {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      localStorage.setItem("timer", timer )
      if(timer == 0){
        setTimer(100)
        InAssigneOrder(assignedOrder?.id);
        OperateurStatus();
        clearInterval(interval);
        localStorage.removeItem("timer");
      }
      return () => {
        clearInterval(interval);
      };
    }, [timer]);
 

    useEffect(()=>{
      AssigneOrder()
      loadStatus()
     
  } , [ orderStore, statusStore])

    const onChange = id  => {

    var status = statusRegistry.get(id)
    assignedOrder.status = status;
    updateOrder(assignedOrder);
   
    };

    const onSubmit =  ()  => {
    UpdateOperateur()
    setAutoPlay(true);
    setIsAnimated(true);
    setTimeout(()=>{
      AssigneOrder();
    } , 1000)
    setTimeout(()=>{
      setAutoPlay(false);
      setIsAnimated(false);
      setTimer(100);
    } , 2000)
      };
  
     const  formatTime = (secs)=> {
        let hours   = Math.floor(secs / 3600);
        let minutes = Math.floor(secs / 60) % 60;
        let seconds = secs % 60;
        return [hours, minutes, seconds]
            .map(v => ('' + v).padStart(2, '0'))
            .filter((v,i) => v !== '00' || i > 0)
            .join(':');
      }

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
      
        <div  className={`d-flex text-center justify-content-between align-items-center  pr-5 submit-order ${!isAnimated ? "" : "animated"}`} >
        <h4 className="ml-5" >
       in {formatTime(timer)} min
      </h4>
          <button className="btn btn-success m-1 btn-lg mb-2 " onClick={onSubmit}>
          Submit
          </button>
        </div>
      </div>
    );
}

export default observer(OperatorOrder) ;

















