import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../../../../../components/FormInput/FormInput'
import { handleLoginWithGoogle, handleRegisterWithEmailAndPassword } from '../../../../../firebase'
import cls from './Register.module.scss'

const EmailAndPasswordRegister = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [photo, setPhoto] = React.useState('')  

  const navigate = useNavigate()

  return (
    <form>
      <h1>Регистрация</h1>
      <FormInput
        type={'text'}
        placeholder={'Имя'}
        defaultValue={name}
        setInputsValue={setName}
        name={'name'}
      />

      <FormInput
        type={'email'}
        placeholder={'Электронная почта'}
        defaultValue={email}
        setInputsValue={setEmail}
        name={'email'}
      />

      <FormInput
        type={'password'}
        placeholder={'Пароль'}
        defaultValue={password}
        setInputsValue={setPassword}
        name={'password'}
      />

      <FormInput
        type={'text'}
        placeholder={'Фото'}
        defaultValue={photo}
        setInputsValue={setPhoto}
        name={'email'}
      />

      <div>
        <button
          className={cls.go}
          onClick={e => {
            e.preventDefault()
            handleRegisterWithEmailAndPassword(email, password, name, photo)
          }
          }
        >
          Отправить
        </button>
        <button 
          onClick={() => navigate('/auth/login')} 
          className={cls.signIn}
          >
          Вход в кабинет
        </button>
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

export default EmailAndPasswordRegister