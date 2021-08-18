import React from 'react'
import { useStore } from './../../stores/Store';
import { Formik, Field } from 'formik';
import { useState } from 'react';
import { Form } from 'formik';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import MyTextInput from './../../common/form/MyTextInput';
import { toast } from 'react-toastify';


const PersonalInformation = () => {
  const { userStore } = useStore();
  // const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
 
  const initialValues =  {
    userName: userStore.user?.userName,
    firstName: userStore.user?.firstName,
    lastName: userStore.user?.lastName,
    email: userStore.user?.email,
    phoneNumber: userStore.user?.phoneNumber,
    address: userStore.user?.address,
    error: null
  }
  const [profileForm] = useState(initialValues);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const profileValidationSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  firstName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  address: Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
  })

    return (
<div className="col-12 col-md-9 col-lg-8">
                <div className="card">
                  <Formik 
                    enableReinitialize
                    validationSchema={profileValidationSchema}
                    initialValues={profileForm} 
                    onSubmit={(values) => userStore.updateProfile(values).catch(error => toast.error(error))} 
                    >

                  
                    {({ errors, touched, handleSubmit, isSubmitting, isValid, dirty}) => (
                                            <Form onSubmit={handleSubmit} autoComplete="off" >
                                            <div className="card-header">
                                              <h4>Edit Profile</h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="section-title">Personal information</div>
                                                <div className="row">
                                                  <div className="form-group col-md-6 col-12">
                                                    <MyTextInput id="firstName" type="text" label="First name" placeholder="first name" className="form-control" name="firstName"   />
                                                  </div>
                                                  <div className="form-group col-md-6 col-12">
                                                    <MyTextInput id="lastName" type="text" label="Last name" placeholder="last name" className="form-control" name="lastName"   />
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <div className="form-group col-md-7 col-12">
                                                    <label htmlFor="email"  className="d-block">Email Address</label>
                                                    <Field id="email" className="form-control"  placeholder="email" type="text" name="email" disabled />
                                                  </div>
                                                  <div className="form-group col-md-5 col-12">
                                                    <MyTextInput id="phoneNumber" type="tel" label="Phone number" placeholder="num" className="form-control" name="phoneNumber"   />
                                                  </div>
                                                </div>
                                                <div className="row">
                                                <div className="form-group col-md-5 col-12">
                                                    <MyTextInput id="userName" type="text" label="Username" placeholder="username" className="form-control" name="userName"   />
                                                  </div>
                                                  <div className="form-group mb-0 col-md-7 col-12">
                                                    <MyTextInput id="address" type="text" label="address" placeholder="address" className="form-control" name="address"   />
                                                  </div>
                                                </div>
                                                {/* <div className="section-title">Preferences</div>
                                                <div className="row">
                                                <div className="form-group col-12">
                                                  <label>Date Format</label>
                                                  <select className="form-control form-control-sm">
                                                    <option>d-m-y (29-06-2021)</option>
                                                    <option>d/m/y (29/06/2021)</option>
                                                    <option>d M Y (29 jun 2021)</option>
                                                  </select>
                                                </div>
                                                <div className="form-group col-12">
                                                  <label>Timezone</label>
                                                  <TimezoneSelect 
                                                    value={selectedTimezone}
                                                    onChange={setSelectedTimezone}
                                                  />
                                                </div>
                                                </div> */}
                                            </div>
                                            <div className="card-footer text-right">
                                              <button type="submit"  className={`btn btn-primary ${!isValid || !dirty || isSubmitting ? "disabled" : ""} ${isSubmitting ? "btn-progress" : ""}`}>Save Changes</button>
                                            </div>
                                            
                                            </Form>
                    )}
                    </Formik>
                </div>
              </div>
    )
}

export default observer(PersonalInformation); 
