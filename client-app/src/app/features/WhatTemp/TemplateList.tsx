import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom'
import {  useStore } from '../../stores/Store'
import StatusRow from './TemplateRow';
import Lottie from 'lottie-react';
import loaderAnimation from "../../assets/loader.json";
import Popup from 'reactjs-popup';
import TemplateForm from './TemplateForm';


function TemplateList() {

    const {whatTempStore} = useStore();

useEffect(()=>{
    whatTempStore.loadTemplate()
} , [whatTempStore])

if(whatTempStore.loadingInitial) return( <div className='d-flex justify-content-center' > <Lottie   animationData={loaderAnimation} /> </div>)

    return (
        <div>
         
            <TemplateForm  />
         
                   
         <div className="card mt-4">

                  <div className="card-body">
                    <table className="table">
                      <thead>
                        <tr>
                         
                          <th scope="col">Message</th>
                          <th scope="col">Date</th>
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

export default observer(TemplateList) ;