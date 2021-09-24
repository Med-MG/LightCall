import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom'
import {  useStore } from '../../stores/Store'
import StatusRow from './StatusRow';
import Lottie from 'lottie-react';
import loaderAnimation from "../../assets/loader.json";
import Popup from 'reactjs-popup';
import StatusForm from './StatusForm';


function StatusList() {

    const {statusStore} = useStore();

useEffect(()=>{
    statusStore.loadStatus()
} , [statusStore])



if(statusStore.loadingInitial) return( <div className='d-flex justify-content-center' > <Lottie   animationData={loaderAnimation} /> </div>)

    return (
        <div>
          <Popup position='center center' className="status"  trigger={()=>  {statusStore.canselSelectedStatus();  return(<button  className="btn btn-icon icon-left btn-primary"> <i className="fa fa-plus" > </i> Add Status  </button>)}} >{close => (
            <StatusForm close={close}  />
            )}
          </Popup>
                   
         <div className="card mt-4">

                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                         
                          <th scope="col">Name</th>
                          <th scope="col">Piority</th>
                          <th scope="col">Actions</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                      
                      <StatusRow  />

                      </tbody>
                    </table>
                  </div>
               
                </div>  


        </div>
    );
}

export default observer(StatusList) ;