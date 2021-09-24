import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom'
import {  useStore } from '../../stores/Store'
import StatusRow from './SmsRow';
import Lottie from 'lottie-react';
import loaderAnimation from "../../assets/loader.json";
import Popup from 'reactjs-popup';
import SmsForm from './SmsForm';
import SmsRow from './SmsRow';


function SmsList() {

    const {smsStore} = useStore();

useEffect(()=>{
    smsStore.loadSms()
} , [smsStore])



if(smsStore.loadingInitial) return( <div className='d-flex justify-content-center' > <Lottie   animationData={loaderAnimation} /> </div>)

    return (
        <div>
          <Popup position='center center' className="status"  trigger={()=>  {smsStore.canselSelectedSms();  return(<button  className="btn btn-icon icon-left btn-primary"> <i className="fa fa-plus" > </i> Add SMS  </button>)}} >{close => (
            <SmsForm close={close}  />
            )}
          </Popup>
                   
         <div className="card mt-4">

                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                         
                          <th scope="col">Name</th>
                          <th scope="col">Message</th>
                          <th scope="col">Status</th>
                          <th scope="col">Projects</th>
                          <th scope="col">Actions</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                      
                      <SmsRow  />

                      </tbody>
                    </table>
                  </div>
               
                </div>  


        </div>
    );
}

export default observer(SmsList) ;