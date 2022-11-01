import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../../../../../components/FormInput/FormInput'
import { handleRegisterWithEmailAndPassword } from '../../../../../firebase'
import useAlert from '../../../../../components/useAlerts'
import { Button } from '@mui/material'
import cls from './Register.module.scss'

const EmailAndPasswordRegister = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [photo, setPhoto] = React.useState('')

  const { actions } = useAlert()

  const navigate = useNavigate()

  const setError = (e) => {
    actions.sweetAlert(e)
  }

  return (
    <form>
      <h1>Регистрация</h1>
      <FormInput
        type='text'
        placeholder={'Имя'}
        defaultValue={name}
        setInputsValue={setName}
        name={'name'}
      />

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

      <FormInput
        type='text'
        placeholder={'Фото'}
        defaultValue={photo.name}
        setInputsValue={setPhoto}
        name={'url'}
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
            password == '' || name == '' || photo == '' || email == ''
            ? cls.disabled : email.includes('@gmail.com') 
            ? cls.go : email != `${email}@gmail.com` 
            ? cls.disabled : cls.go
          }
          onClick={e => {
              e.preventDefault()
              if (email.includes('@gmail.com')) {
                handleRegisterWithEmailAndPassword(email, password, name, photo, setError)
              }
            }
          }
        >
          Отправить
        </Button>
        <Button
          variant='filled' 
          onClick={() => navigate('/auth/login')} 
          className={cls.signIn}
          >
          Вход в кабинет
        </Button>
      </div>
    </form>
  )
}

export default EmailAndPasswordRegister