import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react';

interface Props {
  
  setFiles: (files: File) => void;
  // uploadPhoto: (file : Blob) => void;
}

export default function PhotoWidgetDropZone( {setFiles}: Props) {
  const dzStyles = {
    border: 'dashed 3px #eee',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center' as 'center',
    height: 200
}

const dzActive = {
    borderColor: 'green'
}

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))
  }, [setFiles])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    // style={isDragActive ? {...dzstyle, ...dzActive} :dzstyle}
    <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
      <input {...getInputProps()} />
      {/* {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      } */}
          {/* <div className="form-group">
            <label>File</label>
            <input type="file" className="form-control" />
          </div> */}
          <Icon name='upload' size='huge' />
          <Header content='Drop image here' />
    </div>
  )
}