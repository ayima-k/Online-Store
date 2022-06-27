import React from 'react'
import EmailAndPasswordRegister from './components/EmailAndPasswordRegister'
import cls from './RegisterMain.module.scss'

const Register = () => {

  return (
    <React.Fragment>
      <div className={cls.container}>
        <EmailAndPasswordRegister/>
      </div>
    </React.Fragment>
  )
}

export default Register