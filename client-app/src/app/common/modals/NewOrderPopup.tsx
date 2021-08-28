import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { useStore } from '../../stores/Store';



function NewOrderPopup(props ) {

    const {orderStore  } = useStore()
    const {assignedOrder , updateOrder } = orderStore
    const [value, setValue] = useState(props.value);
    const [isOpen, setOpen] = useState(true);

    const UpdateOrder = ()=> {
    

      
        // updateOrder(assignedOrder!);

        setOpen(false);
        console.log(isOpen);

    }

    return (
        <Popup open={isOpen} className="order" onOpen={()=>setOpen(true)} closeOnDocumentClick={false}  position="center center">
            <div className="d-flex justify-content-around align-items-center shadow-sm p-2  bg-white rounded" >
                <button  onClick={UpdateOrder} className="btn btn-primary  m-5 ">
                    Next Order
                </button> 
                <button onClick={()=>setOpen(false)} type="button" className="btn btn-danger  m-5">
                    Take a Break
                </button>
            </div>
        </Popup>
    );
}

export default observer(NewOrderPopup);