import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../../../../../components/FormInput/FormInput'
import { handleLoginWithEmailAndPassword, handleLoginWithGoogle } from '../../../../../firebase'
import cls from './Login.module.scss'

const EmailAndPasswordLogin = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const navigate = useNavigate()

  return (
    <form>
      <h1>Войти в кабинет</h1>
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

        <div>
          <button
            className={cls.go}
            onClick={e => {
              e.preventDefault()
              handleLoginWithEmailAndPassword(email, password)
            }
          }>
            Отправить
          </button>
          <button 
            onClick={() => navigate('/auth/register')} 
            className={cls.signIn}
          >
            Регистрация
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

export default EmailAndPasswordLogin