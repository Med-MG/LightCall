import React , {useEffect, useState} from 'react';
import { Field, Form, Formik } from 'formik'
import MyTextInput from '../../common/form/MyTextInput';
import * as Yup from 'yup';
import { useStore } from '../../stores/Store';
import {Status} from '../../models/Status'
import { WhatTemp } from '../../models/WhatTemp';
import { observer } from 'mobx-react-lite';


function TemplateForm() {

  const {whatTempStore} = useStore()

  const {selectedTemplate , updateTemplate, createTemplate} = whatTempStore

    let initialValues : WhatTemp  =  {
      id : '',
      message: '',
      date : undefined ,

    }
    const [addTemplateForm ] = useState(initialValues)



   

    const AddTemplateSchema = Yup.object().shape({
      message: Yup.string()
          .min(3, 'Too Short!')
          .max(1000, 'Too Long!').required()
        
      
      })
    
  


    function handleSubmit(values : WhatTemp  , actions : any) {

      if(selectedTemplate){
        values.id = selectedTemplate.id
      }

      selectedTemplate ? updateTemplate(values) : createTemplate(values) ;
      actions.setSubmitting(false)

    }



    return (
        <div className="card ">
        <div className="card-header"><h3>Add new Template Whatsapp</h3></div>
      

        <div className="card-body">

        <h6 className="mb-4" >Help</h6>
        <h6 className="small_text" >For add current order client name add @ in your message.</h6>
        <h6 className="small_text mb-4" >Exemple : Hey @, thank you.</h6>

         <Formik 
            initialValues={addTemplateForm}
            validationSchema={AddTemplateSchema}
            onSubmit={(values , actions ) =>{handleSubmit(values, actions)}}

             >
             {({errors, touched, handleSubmit, isSubmitting, isValid, dirty , values , initialValues }) =>{
               

               if(selectedTemplate){

                initialValues.message = selectedTemplate.message

              }
               
               return(

                <Form onSubmit={handleSubmit}  autoComplete="off">

                         <div className="form-group">
                          <MyTextInput as='textarea'  type="message" name="message" label="Message" />
                        </div> 
                        
                        <div className="mr-auto">
                          <button disabled={!isValid || !dirty || isSubmitting} type="submit"   className="btn btn-primary btn-lg btn-block addTemp ">
                            { selectedTemplate ? "Update" :  "Add"} Template
                          </button>
                        </div>
                </Form>
             )}}
         </Formik>

        </div>
      </div>
    );
}

export default  observer(TemplateForm) ;