import  { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/loader.json";
import {  useStore } from '../../stores/Store'
import ProjectRow from './ProjectRow';
import { Link } from 'react-router-dom';
import { Field, Form, Formik } from 'formik'
import { useState } from 'react';
import ProjectForm from './ProjectForm';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

function ProjectsList() {

     const {projectStore , orderStore , statusStore , modalStore} = useStore();
     const {UploadExel} = orderStore
     const {status } = statusStore ;
     const {projects , loadProjects } = projectStore ;
     const [selectedStatus ,  setSelectedStatus]  = useState("");
     const [selectedProject ,  setSelectedProject]  = useState("");

useEffect(()=>{
    loadProjects()
    statusStore.loadStatus();
    $(document).ready(function () {
      setTimeout(function(){
      $('#table_prj').DataTable();
       } ,2000);
    });
} , [projectStore , statusStore])



function handleSubmit(values : any  , {setErrors } : any) {
   const data = new FormData();
   data.append("importFile" ,values.importFile)
   data.append("statusId" ,selectedStatus)
   data.append("projectId" ,selectedProject)
   
    UploadExel(data);

    
  }



 if(projectStore.loadingInitial) return( <div className='d-flex justify-content-center' > <Lottie   animationData={loaderAnimation} /> </div>)

    return (
      <div>
      <section className="section"> 
        <div>
         <button className="btn btn-icon icon-left btn-primary" onClick={()=>modalStore.openModal(<ProjectForm />)}> <i className="fa fa-plus" > </i> Add New Project  </button> 

        <div className="card p-3 mt-4" >  
        <Formik 

             initialValues={{}}

           onSubmit={(values, {setErrors}) =>{handleSubmit(values, {setErrors})}}

            >
            {({errors, touched, handleSubmit, isSubmitting, isValid, dirty , setValues , values }) => (

               <Form onSubmit={handleSubmit}  autoComplete="off">
            <div className="form-group">
                    <label>File</label>
                    <input name="importFile"  type="file" onChange={(event) => setValues({
    ...values,
    [event.currentTarget.name]: event.currentTarget.files![0]
})} className="form-control"/>
            </div>
            <div className="d-flex justify-content-around  mb-4 ">

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
        </div>

            <div className="ml-auto">
                  <button disabled={!isValid || !dirty || isSubmitting} type="submit" className="btn btn-primary btn-lg  ">
                    Import
                  </button>
            </div>
            </Form>
             )}
            </Formik>
            
        </div>
      
         <div className="card mt-4">

                  <div className="card-body">
                    <table className="table" id="table_prj">
                      <thead>
                        <tr>
                          <th scope="col">Project Name</th>
                          <th scope="col">Is Shopify</th>
                          <th scope="col">Actions</th>

                        </tr>
                      </thead>
                      <tbody>
                      
                   <ProjectRow/> 

                      </tbody>
                    </table>
                  </div>
               
                </div>  
        </div>
        </section>
      </div>
    );
}

export default observer(ProjectsList) ;