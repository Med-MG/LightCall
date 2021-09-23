import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { Status } from '../../models/Status';
import { useStore } from '../../stores/Store';
import StatusForm from './TemplateForm';



function TemlateRow() {
   
  
   const {whatTempStore} = useStore();

   const {selectTemplate , deleteTemplate , Templates , canselSelectedTemplate} = whatTempStore

    return ( 
        <>
        {Templates.map((temp)=> {

         return ( 
        <tr key={temp.id}>
        <td>{temp.message}</td>
        <td>{moment(temp.date as Date).format('LLL')}</td>
        <td>
          <div >


          <button  onClick={()=> selectTemplate(temp.id) } className="btn btn-info mr-2" >Edit </button>

            {/* <Link to="/Status/EditStatus" onClick={()=> selectStatus(statu.id) } className="btn btn-info mr-2" >Edit</Link> */}
            <button className="btn btn-danger" onClick={()=> deleteTemplate(temp.id) } >Delete</button>
          </div>
          </td>
      </tr>)}

        )}

     
      </>
    );
}

export default observer(TemlateRow);