import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { useStore } from '../../stores/Store';

interface props {
    for : string ;
    value : string ;
    type : string ;
}

function PopupForm(props : props) {

    const {orderStore  } = useStore()
    const {assignedOrder , updateOrder } = orderStore
    const [value, setValue] = useState(props.value);
    const [isOpen, setOpen] = useState(false);

    const UpdateOrder = ()=> {
    

        switch (props.for) {
            
            case "price" :
            assignedOrder!.price = Number(value);
            break;  
            
            case "fullname" :
                assignedOrder!.customer.fullName = value;
            break;

            case "adresse" :
                assignedOrder!.customer.fullAdresse = value;
            break;

            case "email" :
                assignedOrder!.customer.email = value;
            break;

            case "phone" :
                assignedOrder!.customer.phone = value;
            break;
        
            default:
                break;
        }
        updateOrder(assignedOrder!);

        setOpen(false);
        console.log(isOpen);

    }

    return (
        <Popup open={isOpen} onOpen={()=>{setOpen(true); setValue(props.value) }} trigger={<span   >{props.value}</span>} position="right center">
            <div className="d-flex justify-content-around align-items-center shadow-sm p-2  bg-white rounded" >
                <input type={props.type}  value={value} onChange={(e)=>setValue(e.target.value)} className="form-control form-control-sm" /> 
                <button  onClick={UpdateOrder} className="btn btn-primary btn-sm editable-submit mx-2 ">
                    <i className="fa fa-check" aria-hidden="true"></i>
                </button> 
                <button onClick={()=>setOpen(false)} type="button" className="btn btn-danger btn-sm px-2 editable-cancel ">
                    <i className="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
        </Popup>
    );
}

export default observer(PopupForm);