import React from 'react'
import EmailAndPasswordLogin from './components/EmailAndPasswordLogin'
import cls from './LoginMain.module.scss'

const Login = () => {

  return (
    <React.Fragment>
      <div className={cls.container}>
        <EmailAndPasswordLogin/>
      </div>
    </React.Fragment>
  )
}

export default Login