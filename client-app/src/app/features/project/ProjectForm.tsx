import React , {useState} from 'react';
import { Field, Form, Formik } from 'formik'
import MyTextInput from '../../common/form/MyTextInput';
import * as Yup from 'yup';
import { useStore } from '../../stores/Store';
import {Status} from '../../models/Status'
import { Project } from '../../models/Project';
import {v4 as uuid} from 'uuid';



function ProjectForm() {

  const {projectStore} = useStore()

  const {selectedProject , updateProject , createProject} = projectStore

    let initialValues : Project =  {
      id : uuid(),
      project_Type: '',
      isShopify: false,
      WebHookSecret : ''
    }



    const AddProjectSchema = Yup.object().shape({
        project_Type: Yup.string()
          .min(3, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
          isShopify: Yup.boolean()
          .required('Required'),
      
      
      })
    
    const [addProjectForm] = useState(initialValues)


    function handleSubmit(values : Project  , {setErrors } : any) {
       console.log(addProjectForm.isShopify);
        
        console.log(values);
        
         selectedProject ? updateProject(values) : createProject(values) ;
    }



    return (
      <div>
      <section className="section">
      <div className="section-header">
          <h1>Projects</h1>
        </div> 
        <div className="card card-primary">
        <div className="card-header"><h4>Add Project</h4></div>

        <div className="card-body">
         <Formik 
           
            initialValues={addProjectForm}
            validationSchema={AddProjectSchema}
            onSubmit={(values, {setErrors}) =>{handleSubmit(values, {setErrors})}}

             >
             {({errors, touched, handleSubmit, isSubmitting, isValid, dirty , values}) => (

                <Form onSubmit={handleSubmit}  autoComplete="off">

                        <div className="form-group">
                          <MyTextInput type="Name" placeholder="Projects Name" name="project_Type" label="Name" />
                        </div>

                   

               
                         <div className=" form-group custom-control custom-checkbox">
                      <Field type="checkbox" className="custom-control-input" name="isShopify" id="customCheck1"  />
                      <label className="custom-control-label" htmlFor="customCheck1"> Is Shopify</label>
                      </div> 
                 {values.isShopify && <>

                    <div className="form-group">
                    <label>Webhook Url</label>
                      <input type="text" className="form-control" readOnly value={"http://localhost:5000/api/order/shopify/" +values.id}  />
                         
                        </div>

                   <div className="form-group">
                   <MyTextInput  type="WebHookSecret" placeholder="WebHook Secret" name="WebHookSecret" label="WebHook Secret" />
                 </div>



                        
                        </>
                        }
                      

                     

                        
                        <div className="form-group">
                          <button disabled={!isValid || !dirty || isSubmitting} type="submit" className="btn btn-primary btn-lg btn-block">
                            Add Project
                          </button>
                        </div>
                </Form>
             )}
         </Formik>

        </div>
      </div>
      </section>
      </div>
    );
}

export default ProjectForm;