import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import MyTextInput from "../../common/form/MyTextInput";
import Select from 'react-select';
import { Product } from "../../models/Product";
import { Project } from "../../models/Project";
import { useStore } from "../../stores/Store";
import { observer } from "mobx-react-lite";
import PhotoUploadWidget from "../../common/imageUpload/PhotoUploadWidget";
import { Grid, Header } from "semantic-ui-react";
import PhotoWidgetCropper from "../../common/imageUpload/PhotoWidgetCropper";
import PhotoWidgetDropZone from "../../common/imageUpload/PhotoWidgetDropZone";
// interface Props {
//   loading: boolean;
// }
export default observer(function ProductForm(){
    const {productStore , projectStore} = useStore();
    const {creatProduct , updateProduct , productSelected ,  uploading , loading} = productStore;
    const {projects} = projectStore;
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();
    let initialValues  = productSelected ?? {
        id : '',
        name : '',
        description : '',
        quantity : '',
        ProjectId : '',
        project : undefined,
        file : undefined,
        photos : undefined
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

    
    useEffect(() => {
      return () => {
          files.forEach((file: any) => URL.revokeObjectURL(file.preview))
      }
    }, [files])

    const onchange  = (e : any)=>{
      console.log(e.value) 
        prjSelected = e.value;
    }

    // function handalePhotoUpload(file: Blob){
    //   uploadPhoto(file);
    // }
    function handleSubmit(values : Product  , {setErrors } : any) {
        values.ProjectId = prjSelected;
        // values.photos = files;
        // values.photos?.push(files);
        // console.log(files);
        // onCrop();
        console.log(values);
        // productSelected ? updateProduct(values) : creatProduct(values) ;
        if(productSelected){
          updateProduct(values)
        }else{
          if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob =>  creatProduct(values , blob!));
        }
        }
        
    }
    //uplod widget

    useEffect(() => {
      return () => {
          files.forEach((file: any) => URL.revokeObjectURL(file.preview))
      }
    }, [files])

    // function onCrop() {
    //   if (cropper) {
    //       cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
    //   }
    // }

    if(projectStore.loadingInitial) return(<div>Loading...</div>)
    return(
      <div className="main-content">
        <div className="card card-primary">
            <div className="card-header"><h4>{productSelected ? "Edit Product" : "Add Product"}</h4></div>
            <div className="card-body">
                <Formik initialValues={product} 
                      // validationSchema={AddCitySchema}
                      onSubmit={(values, {setErrors}) =>
                      {handleSubmit(values, {setErrors})}}
                >
             {({errors, touched, handleSubmit, isSubmitting, isValid, dirty}) => (
                <Form onSubmit={handleSubmit }  autoComplete="off">
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
                          {/* <PhotoWidgetDropZone uploadPhoto={handalePhotoUpload}/> */}
                          {/* {files && files.length>0 &&(
                            <Image src={files[0].preview} />
                          )} */}
                          <Grid.Column width={4}>
                              <Header sub color='teal' content='Step 1 - Add Photo' />
                              <PhotoWidgetDropZone setFiles={setFiles} />
                          </Grid.Column>
                          <Grid.Column width={4}>
                              <Header sub color='teal' content='Step 2 - Resize image' />
                              {files && files.length > 0 && (
                                  <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                              )}
                          </Grid.Column>
                           {/* <PhotoUploadWidget uploadPhoto={handalePhotoUpload} loading={uploading}/> */}
                        </div>
                        <div className="form-group">
                          <button type="submit" className="btn btn-primary btn-lg btn-block" >
                            {productSelected ? "Edit Product" : "Add Product"}
                          </button>
                        </div>
                </Form>
             )}
         </Formik>

        </div>
      </div>
    </div>
    );
})