import React from 'react'
import cls from './FormInput.module.scss'

const FormInput = (
  {
    type,
    placeholder,
    defaultValue,
    setInputsValue,
    name 
  }
  ) => {  
  return (
    <div style={{marginTop: '2rem'}}>
      <input 
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(e) => setInputsValue(e.target.value)}
        name={name}
        className={cls.input}
        autoComplete='on'
      />
    </div>
  )
}

export default FormInput