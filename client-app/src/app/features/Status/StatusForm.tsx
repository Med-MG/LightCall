import React , {useState} from 'react';
import { Field, Form, Formik } from 'formik'
import MyTextInput from '../../common/form/MyTextInput';
import * as Yup from 'yup';
import { useStore } from '../../stores/Store';
import {Status} from '../../models/Status'


function StatusForm() {

  const {statusStore} = useStore()

  const {selectedStatus , updateStatus , createStatus} = statusStore

    let initialValues : Status =  {
      id : '',
      statusType: '',
      statusPiority: '',
      closingStatus: false,
        
    }

    if(selectedStatus){
    initialValues = selectedStatus ;
    }

    const AddStatusSchema = Yup.object().shape({
      statusType: Yup.string()
          .min(3, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
          statusPiority: Yup.number()
          .required('Required'),
          closingStatus: Yup.boolean()

          .required('Required'),
      
      
      })
    
    const [addStatusForm] = useState(initialValues)


    function handleSubmit(values : Status  , {setErrors } : any) {
      selectedStatus ? updateStatus(values) : createStatus(values) ;
    }



    return (
        <div className="card card-primary status-form">
        <div className="card-header"><h4>{selectedStatus ? "Edit Status" : "Add Status"}</h4></div>

        <div className="card-body">
         <Formik 
           
            initialValues={addStatusForm}
            validationSchema={AddStatusSchema}
            onSubmit={(values, {setErrors}) =>{handleSubmit(values, {setErrors})}}

             >
             {({errors, touched, handleSubmit, isSubmitting, isValid, dirty}) => (

                <Form onSubmit={handleSubmit}  autoComplete="off">

                        <div className="form-group">
                          <MyTextInput type="Name" placeholder="Status Name" name="statusType" label="Name" />
                        </div>

                        <div className="form-group">
                          <MyTextInput type="Priority" placeholder="Status Priority" name="statusPiority" label="Priority" />
                        </div>

               
                         <div className=" form-group custom-control custom-checkbox">
                      <Field type="checkbox" className="custom-control-input" name="closingStatus" id="customCheck1"  />
                      <label className="custom-control-label" htmlFor="customCheck1"> Is Active</label>
                      </div> 

                       

                     

                        
                        <div className="form-group">
                          <button disabled={!isValid || !dirty || isSubmitting} type="submit" className="btn btn-primary btn-lg btn-block">
                            Add Status
                          </button>
                        </div>
                </Form>
             )}
         </Formik>

        </div>
      </div>
    );
}

export default StatusForm;