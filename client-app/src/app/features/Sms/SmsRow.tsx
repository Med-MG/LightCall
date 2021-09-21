import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { Status } from '../../models/Status';
import { useStore } from '../../stores/Store';
import StatusForm from './SmsForm';
import{Project}  from "../../models/Project"
import SmsForm from './SmsForm';



function SmsRow() {
   
  
   const {smsStore} = useStore();

   const {selectSms , deleteSms , smss , canselSelectedSms} = smsStore

    return ( 
        <>
        {smss.map((sms)=> {
          console.log(sms.smsName)
         return ( 
        <tr key={sms.id}>
        <td>{sms.smsName}</td>
        <td>{sms.message}</td>
        <td>{(sms.status as Status)?.statusType }</td>
        <td>{(sms.project as Project)?.project_Type }</td>
        <td>
          <div >


          <Popup position='center center' className="status" onClose={()=> canselSelectedSms()}  trigger={ () => {  selectSms(sms.id); return (<button  onClick={()=> selectSms(sms.id) } className="btn btn-info mr-2" >Edit </button>)} } >
            <SmsForm  />
          </Popup>

            {/* <Link to="/Status/EditStatus" onClick={()=> selectStatus(statu.id) } className="btn btn-info mr-2" >Edit</Link> */}
            <button className="btn btn-danger" onClick={()=> deleteSms(sms.id) } >Delete</button>
          </div>
          </td>
      </tr>)}

        )}

     
      </>
    );
}

export default observer(SmsRow);