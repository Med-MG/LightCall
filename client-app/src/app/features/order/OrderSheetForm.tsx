import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { useStore } from '../../stores/Store';
import { OrderSheet } from '../../models/OrderSheet';
import { Form, Formik } from 'formik';
import MyTextInput from '../../common/form/MyTextInput';
import Select from 'react-select';
import { Product } from '../../models/Product';

function OrderSheetForm() {
    const {orderStore , projectStore, productStore} = useStore()
    const {sheetConnect} = orderStore

    let initialValues : OrderSheet =  {
        SpreadsheetId : '',
        sheet: '',
        // project_id : '',
        // project : undefined,
        Products_ids : []
    }

    const [addSheetInfo] = useState(initialValues)

     //get all project
    //  const {projects} = projectStore;
    //  var ProjecttName=[{}]
 
    //  useEffect(()=>{
    //    projectStore.loadProjects();
    //  } , [projectStore])
 
    //  projects.map(project =>{
    //    ProjecttName.push({
    //      value:project.id,
    //      label:project.project_Type
    //    })
    //  })
    // //  console.log(ProjecttName[1]);
    //  var projet : string = '';
     
    //  const onchangeProject  = (e : any)=>{
    //    projet = e.value
    //  }
     //end
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
      //end
    function handleSubmit(values : OrderSheet  , {setErrors } : any) {
        console.log(values)
        console.log(allProduct)
        values.Products_ids = allProduct;
        // values.project_id = projet;
        sheetConnect(values) 
    }
    return(
            <div className="main-content">
        <section className="section">
          <div className="section-header">
              <h1>Orders</h1>
          </div> 
          <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>Connect your google sheet with us</h4>
                  </div>
                  <div className="card-body">
                  <Formik 
                    initialValues={addSheetInfo}
                    onSubmit={(values, {setErrors}) =>{handleSubmit(values, {setErrors})}}
                  >
            {({errors, touched, handleSubmit, isSubmitting, isValid, dirty}) => (

               <Form onSubmit={handleSubmit}  autoComplete="off">

                       <div className="form-group">
                         <MyTextInput type="SpreadsheetId" placeholder="Spreadsheet Id" name="SpreadsheetId" label="Spreadsheet Id" />
                       </div>

                       <div className="form-group">
                         <MyTextInput type="sheet" placeholder="sheet name" name="sheet" label="sheet" />
                       </div>
                       <div className="form-group">
                          <Select isMulti options={ProductName} onChange={onchange} />
                        </div>
                       {/* <div className="form-group">
                          <Select options={ProjecttName} onChange={onchangeProject} />
                        </div> */}

                       <div className="form-group">
                         <button type="submit" className="btn btn-primary btn-lg btn-block">
                           Add sheet
                         </button>
                       </div>
               </Form>
            )}
        </Formik>
                  </div>
                </div>
              </div>
            </div>
        </section>
      </div>
    )
}

export default observer(OrderSheetForm) ;