import React, { useState } from 'react'
import { useStore } from '../../stores/Store'
import * as Yup from 'yup';
import {  Form, Formik } from 'formik';
import MyTextInput from '../../common/form/MyTextInput';
import { City } from '../../models/city';

export default function CityForm(){
    const {cityStore} = useStore();
    const {creatCity , updateCity , citySelected} = cityStore;
    let initialValues  = citySelected ?? {
        id : '',
        cityName : '',
        zipCode : '',
        shipping_ids : []
      }
      const [city ] = useState(initialValues);
      const AddCitySchema = Yup.object().shape({
            CityName: Yup.string()
                .min(3, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),    
            ZipCode: Yup.string()
                .min(3, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
        })
        console.log("jfrhfhrfh");
        const [addOperateurForm] = useState(initialValues)
        function handleSubmit(values : City  , {setErrors } : any) {
            values.shipping_ids = [];
            citySelected ? updateCity(values) : creatCity(values) ;
        }
        return(
        <div className="card card-primary">
            <div className="card-header"><h4>{citySelected ? "Edit City" : "Add City"}</h4></div>
            <div className="card-body">
                <Formik initialValues={city} 
                      // validationSchema={AddCitySchema}
                      onSubmit={(values, {setErrors}) =>
                      {handleSubmit(values, {setErrors})}}
                >
             {({errors, touched, handleSubmit, isSubmitting, isValid, dirty}) => (
                <Form onSubmit={handleSubmit}  autoComplete="off">
                        <div className="form-group">
                          <MyTextInput type="Name" placeholder="City Name" name="cityName" label="City Name" />
                        </div>

                        <div className="form-group">
                          <MyTextInput type="text" placeholder="Zip Code" name="zipCode" label="Zip Code" />
                        </div>
                        <div className="form-group">
                          <button type="submit" className="btn btn-primary btn-lg btn-block">
                            {citySelected ? "Edit City" : "Add City"}
                          </button>
                        </div>
                </Form>
             )}
         </Formik>

        </div>
      </div>
    );
  //   return(
  //     <div className="card card-primary">
  //         <div className="card-header"><h4>Add shipping Company</h4></div>
  //         <div className="card-body">
  //         <Formik initialValues={city} 
  //             validationSchema={AddCitySchema}
  //             onSubmit={(values, {setErrors}) =>
  //             {handleSubmit(values, {setErrors})}}>
  //           {({errors, touched, handleSubmit, isSubmitting, isValid, dirty , values}) => (
  //             <Form onSubmit={handleSubmit}  autoComplete="off">
  //                     <div className="form-group">
  //                       <MyTextInput type="text" placeholder="cityName" name="cityName" label="cityName" />
  //                     </div>
  //                     <div className="form-group">
  //                       <MyTextInput type="text" placeholder="zipCode" name="zipCode" label="zipCode" />
  //                     </div>
  //                     <div className="form-group">
  //                       <button type="submit" className="btn btn-primary btn-lg btn-block">
  //                         Add city
  //                       </button>
                        
  //                     </div>
  //             </Form>
  //          )}
  //      </Formik>

  //     </div>
  //   </div>
  // )
}