import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import MyTextInput from "../../common/form/MyTextInput";
import Select from 'react-select';
import { Product } from "../../models/Product";
import { Project } from "../../models/Project";
import { useStore } from "../../stores/Store";
import { observer } from "mobx-react-lite";

export default observer(function ProductForm(){
    const {productStore , projectStore} = useStore();
    const {creatProduct , updateProduct , productSelected} = productStore;
    const {projects} = projectStore;

    let initialValues  = productSelected ?? {
        id : '',
        name : '',
        description : '',
        quantity : '',
        ProjectId : '',
        project : undefined
    }
    var ProjectName = [{}];
    const [product ] = useState(initialValues);
    var prjSelected :string = '';

    projects.map(project =>{
      ProjectName.push({
        value:project.id,
        label:project.project_Type
      })
    })

    useEffect(()=>{
      projectStore.loadProjects()
    } , [projectStore])

    
    const onchange  = (e : any)=>{
      console.log(e.value) 
        prjSelected = e.value;
    }
      function handleSubmit(values : Product  , {setErrors } : any) {
          values.ProjectId = prjSelected;
          console.log(values);
          productSelected ? updateProduct(values) : creatProduct(values) ;
      }

    if(projectStore.loadingInitial) return(<div>Loading...</div>)
    return(
        <div className="card card-primary">
            <div className="card-header"><h4>{productSelected ? "Edit Product" : "Add Product"}</h4></div>
            <div className="card-body">
                <Formik initialValues={product} 
                      // validationSchema={AddCitySchema}
                      onSubmit={(values, {setErrors}) =>
                      {handleSubmit(values, {setErrors})}}
                >
             {({errors, touched, handleSubmit, isSubmitting, isValid, dirty}) => (
                <Form onSubmit={handleSubmit}  autoComplete="off">
                        <div className="form-group">
                          <MyTextInput type="Name" placeholder="name" name="name" label="name" />
                        </div>

                        <div className="form-group">
                          <MyTextInput type="text" placeholder="description" name="description" label="description" />
                        </div>

                        <div className="form-group">
                          <MyTextInput type="text" placeholder="quantity" name="quantity" label="quantity" />
                        </div>

                        <div className="form-group">
                          <Select options={ProjectName} name='project' onChange={onchange} />
                        </div>

                        <div className="form-group">
                          <button type="submit" className="btn btn-primary btn-lg btn-block">
                            {productSelected ? "Edit Product" : "Add Product"}
                          </button>
                        </div>
                </Form>
             )}
         </Formik>

        </div>
      </div>
    );
})