import React , {useState , useEffect} from 'react';
import { Field, Form, Formik } from 'formik'
import MyTextInput from '../../common/form/MyTextInput';
import * as Yup from 'yup';
import { useStore } from '../../stores/Store';
import {Sms} from '../../models/Sms'
import { observer } from 'mobx-react-lite';
import { Status } from '../../models/Status';
import { Project } from '../../models/Project';


function SmsForm(props : any) {

  const {smsStore , statusStore , projectStore} = useStore()

  const {selectedSms , updateSms , createSms , loadSms} = smsStore
  const {status , loadStatus , statusRegistry } = statusStore ;
  const {projects , loadProjects , projectsRegistry  } = projectStore ;
  const [selectedStatus ,  setSelectedStatus]  = useState("");
  const [selectedProject ,  setSelectedProject]  = useState("");

  useEffect(()=>{
    loadProjects()
    loadStatus()
 
   } , [projectStore , statusStore])
   
   useEffect(()=>{
   
   setSelectedStatus(status[0]?.id) ;
   setSelectedProject(projects[0]?.id) ;
   } , [status , projects ])

    let initialValues : Sms =  {
      id : '',
      smsName: '',
      message: '',
      status: '',
      project: '',
      isActive: false,
        
    }

    if(selectedSms){
    initialValues = selectedSms ;
    }

    const AddSmsSchema = Yup.object().shape({
      smsName: Yup.string()
          .min(3, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
          message: Yup.string()
          .min(3, 'Too Short!')
          .max(1000, 'Too Long!')
          .required('Required'),
          isActive: Yup.boolean()

          .required('Required'),
      
      
      })
    
    const [addSmsForm] = useState(initialValues)


    async function  handleSubmit(values : Sms  , {setErrors } : any) {

      const status = statusRegistry.get(selectedStatus) as Status
      const project = projectsRegistry.get(selectedProject) as Project

      values.status = selectedStatus
      values.project = selectedProject
      console.log(values);
      
      await selectedSms ? updateSms(values , status , project ) : createSms(values ,status , project) ;

      props.close();

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
                          <MyTextInput type="Name" placeholder="Sms Name" name="smsName" label="Name" />
                        </div>

                        <div className="form-group">
                          <MyTextInput type="message" placeholder="message" name="message" label="message" />
                        </div>
                        <div className="d-flex justify-content-around  mb-4 ">
                        <div className=" d-flex mr-5 w-50 align-items-center" >
                      <h6 className="mb-0 mr-3" >Status  </h6>
                      <select className="form-control " name="status" onChange={(e : any)=>setSelectedStatus(e.target.value)} >
                        
                      {status.map((status) =>{

                        if(selectedSms){

                          setSelectedStatus((selectedSms.status as Status).id)
                          
                          if(status.id == selectedStatus)
                          return(
                            <option key={status.id} selected value={status.id}> {status.statusType}</option>)

                            else
                            return(
                              <option key={status.id}  value={status.id}> {status.statusType}</option>)
                          
                        }
                        return(
                    <option key={status.id}  value={status.id}> {status.statusType}</option>)
                      })}
                      </select>
                      </div>

                    <div className=" d-flex w-50 align-items-center " >
                    <h6 className="mb-0 mr-3" > Project </h6>
                      <select className="form-control " name="projects"  onChange={(e : any)=>setSelectedProject(e.target.value)} >
                      {projects.map((project) =>{

                      if(selectedSms){

                        setSelectedProject((selectedSms.project as Project).id)
                        
                        if(project.id == selectedProject)
                          return(
                          <option key={project.id} selected  value={project.id}> {project.project_Type}</option>)
                          else
                          return(
                            <option key={project.id}  value={project.id}> {project.project_Type}</option>)
                      }
                        return(
                    <option key={project.id}  value={project.id}> {project.project_Type}</option>)
                      })}
                      </select>

                      </div>
                      </div>

               
                         <div className=" form-group custom-control custom-checkbox">
                      <Field type="checkbox" className="custom-control-input" name="isActive" id="customCheck1"  />
                      <label className="custom-control-label" htmlFor="customCheck1"> Is Active</label>
                      </div> 

                       

                     

                        
                        <div className="form-group">
                          <button disabled={!isValid || !dirty || isSubmitting} type="submit" className="btn btn-primary btn-lg btn-block">
                         {selectedSms ? "EDIT SMS" : "ADD SMS"}
                          </button>
                        </div>
                </Form>
             )}
         </Formik>

        </div>
      </div>
    );
}

export default observer(SmsForm) ;