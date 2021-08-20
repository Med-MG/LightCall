import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Select from 'react-select';
import { boolean } from "yup";
import MyTextInput from "../../common/form/MyTextInput";
import { Product } from "../../models/Product";
import { UpSell } from "../../models/UpSell";
import { useStore } from "../../stores/Store";

export default observer(function Upsell(){
    const {upsellStore , productStore , projectStore} = useStore();
    const { upsellSelected ,createUpSell , updateUsell}  = upsellStore;
    let initialValues  = upsellSelected ?? {
        id : '',
        status : true,
        name : '',
        project_id : '',
        project : undefined,
        product_ids : []
    }

    const [upsell] = useState(initialValues);
    //get all project
    const {projects} = projectStore;
    var ProjecttName=[{}]

    useEffect(()=>{
      projectStore.loadProjects();
    } , [projectStore])

    projects.map(project =>{
      ProjecttName.push({
        value:project.id,
        label:project.project_Type
      })
    })

    var projet : string = '';
    
    const onchangeProject  = (e : any)=>{
      projet = e.value
    } 

    //get all product
    const {products} = productStore;
    var ProductName=[{}]

    useEffect(()=>{
      productStore.loadProducts()
    } , [productStore])

    products.map(product =>{
      ProductName.push({
        value:product.id,
        label:product.name
      })
    })
    const allProduct :Product[] = [];
    
    const onchange  = (e : any)=>{
      e.forEach((el : any )  => {
        allProduct.push(el.value)
      });
    } 
    //request
    function handleSubmit(values : UpSell  , {setErrors } : any) {
        values.product_ids = allProduct;
        values.project_id = projet;
        console.log(values); 
        upsellSelected ? updateUsell(values) : createUpSell(values) ;
    }
    // ui
    return(
        <div className="card card-primary">
            <div className="card-header"><h4>{upsellSelected ? "Edit Upsell" : "Add Upsell"}</h4></div>

            <div className="card-body">
                <Formik initialValues={upsell} 
                      // validationSchema={AddCitySchema}
                      onSubmit={(values, {setErrors}) =>
                      {handleSubmit(values, {setErrors})}}
                >
             {({errors, touched, handleSubmit, isSubmitting, isValid, dirty}) => (
                <Form onSubmit={handleSubmit}  autoComplete="off">
                        <div className="form-group">
                          <MyTextInput type="name" placeholder="name" name="name" label="name" />
                        </div>

                        <div className="form-group">
                          <Select isMulti options={ProductName} onChange={onchange} />
                        </div>

                        <div className="form-group">
                          <Select options={ProjecttName} onChange={onchangeProject} />
                        </div>

                        <div className="form-group">
                          <button type="submit" className="btn btn-primary btn-lg btn-block">
                            {upsellSelected ? "Edit Product" : "Add Product"}
                          </button>
                        </div>
                </Form>
             )}
         </Formik>

        </div>
        </div>
    )
})