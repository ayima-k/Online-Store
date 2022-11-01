import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { handleLoginWithEmailAndPassword, handleLoginWithGoogle } from '../../../../../firebase'
import FormInput from '../../../../../components/FormInput/FormInput'
import Swal from "sweetalert2";
import cls from './Login.module.scss'

const EmailAndPasswordLogin = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const navigate = useNavigate()

  const setError = (e) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    return Toast.fire({
      icon: 'error',
      title: `${e.toString().substr(37,34)}`
    })
  }

  return (
    <form className={cls.form}>
      <h1>Войти в кабинет</h1>
        <FormInput
          type='email'
          placeholder={'Электронная почта'}
          defaultValue={email}
          setInputsValue={setEmail}
          name={'email'}
        />

        <FormInput
          type='password'
          placeholder={'Пароль'}
          defaultValue={password}
          setInputsValue={setPassword}
          name={'password'}
        />

        <div>
          <Button
            color='white'
            variant={
              password == '' || email == '' 
              ? 'disabled' : email.includes('@gmail.com') 
              ? 'filled' : email != `${email}@gmail.com` 
              ? 'disabled' : 'filled'
            }
            className={
              password == '' || email == '' 
              ? cls.disabled : email.includes('@gmail.com') 
              ? cls.go : email != `${email}@gmail.com` 
              ? cls.disabled : cls.go
            }
            onClick={e => {
              e.preventDefault()
              if (email.includes('@gmail.com')) {
                handleLoginWithEmailAndPassword(email, password, setError) 
              }
            }
            }
          >
            Отправить
          </Button>
          <Button
            variant='filled' 
            onClick={() => navigate('/auth/register')} 
            className={cls.signIn}
          >
            Регистрация
          </Button>
        </div>


        <div className={cls.container} onClick={handleLoginWithGoogle}>
          <img
            width={'30px'}
            style={{cursor: 'pointer'}}
            src="https://cdn-icons-png.flaticon.com/512/2875/2875404.png" 
            alt=""
          />
          <p>Войти с помощью Google?</p>
        </div>
    </form>
  )
}

export default EmailAndPasswordLogin