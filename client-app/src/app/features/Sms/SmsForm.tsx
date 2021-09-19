import React , {useState , useEffect} from 'react';
import { Field, Form, Formik } from 'formik'
import MyTextInput from '../../common/form/MyTextInput';
import * as Yup from 'yup';
import { useStore } from '../../stores/Store';
import {Sms} from '../../models/Sms'


function SmsForm() {

  const {smsStore , statusStore , projectStore} = useStore()

  const {selectedSms , updateSms , createSms} = smsStore
  const {status } = statusStore ;
  const {projects , loadProjects } = projectStore ;
  const [selectedStatus ,  setSelectedStatus]  = useState("");
  const [selectedProject ,  setSelectedProject]  = useState("");

useEffect(()=>{
 loadProjects()
 statusStore.loadStatus()
} , [projectStore , statusStore])

    let initialValues : Sms =  {
      id : '',
      SmsName: '',
      Message: '',
      status: '',
      project: '',
      IsActive: false,
        
    }

    if(selectedSms){
    initialValues = selectedSms ;
    }

    const AddSmsSchema = Yup.object().shape({
      SmsName: Yup.string()
          .min(3, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
          Message: Yup.string()
          .min(3, 'Too Short!')
          .max(1000, 'Too Long!')
          .required('Required'),
          IsActive: Yup.boolean()

          .required('Required'),
      
      
      })
    
    const [addSmsForm] = useState(initialValues)


    function handleSubmit(values : Sms  , {setErrors } : any) {
      values.status = selectedStatus
      values.project = selectedProject
      selectedSms ? updateSms(values) : createSms(values) ;
    }



    return (
        <div className="card card-primary status-form">
        <div className="card-header"><h4>{selectedSms ? "Edit Sms" : "Add Sms"}</h4></div>

        <div className="card-body">
         <Formik 
            initialValues={addSmsForm}
            validationSchema={AddSmsSchema}
            onSubmit={(values, {setErrors}) =>{handleSubmit(values, {setErrors})}}

             >
             {({errors, touched, handleSubmit, isSubmitting, isValid, dirty}) => (

                <Form onSubmit={handleSubmit}  autoComplete="off">

                        <div className="form-group">
                          <MyTextInput type="Name" placeholder="Sms Name" name="SmsName" label="Name" />
                        </div>

                        <div className="form-group">
                          <MyTextInput type="Message" placeholder="Message" name="Message" label="Message" />
                        </div>

                        <div className=" d-flex mr-5 w-50 align-items-center" >
                      <h6 className="mb-0 mr-3" >Status  </h6>
                      <select className="form-control " name="status" onChange={(e : any)=>setSelectedStatus(e.target.value)} >
                        
                      {status.map((status) =>{
                        return(
                    <option key={status.id}  value={status.id}> {status.statusType}</option>)
                      })}
                      </select>
                      </div>

                    <div className=" d-flex w-50 align-items-center " >
                    <h6 className="mb-0 mr-3" > Project </h6>
                      <select className="form-control " name="projects"  onChange={(e : any)=>setSelectedProject(e.target.value)} >
                      {projects.map((project) =>{
                        return(
                    <option key={project.id}  value={project.id}> {project.project_Type}</option>)
                      })}
                      </select>

                      </div>

               
                         <div className=" form-group custom-control custom-checkbox">
                      <Field type="checkbox" className="custom-control-input" name="IsActive" id="customCheck1"  />
                      <label className="custom-control-label" htmlFor="customCheck1"> Is Active</label>
                      </div> 

                       

                     

                        
                        <div className="form-group">
                          <button disabled={!isValid || !dirty || isSubmitting} type="submit" className="btn btn-primary btn-lg btn-block">
                            Add SMS
                          </button>
                        </div>
                </Form>
             )}
         </Formik>

        </div>
      </div>
    );
}

export default SmsForm;