import { TextField } from '@mui/material'
import React from 'react'
import cls from './FormInput.module.scss'

const FormInput = (
  {
    placeholder,
    defaultValue,
    setInputsValue,
    name 
  }
  ) => {  
  return (
    <div style={{marginTop: '2rem'}}>
      <TextField
        id="standard-basic"
        variant="standard"
        type={name == 'password' ? 'password' : name == 'email' || name == 'name' ? 'text' : name == 'photo' ? 'file' : ''}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(e) => setInputsValue(e.target.value)}
        name={name}
        className={name == 'password' || name == 'email' || name == 'url' || name == 'name' ? cls.input : cls.fileInput}
        autoComplete='on'
      />
    </div>
  )
}

export default FormInput