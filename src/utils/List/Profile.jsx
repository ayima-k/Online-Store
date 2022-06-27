import React from 'react'
import { handleSignOut } from '../../firebase'
import { useAuth } from '../../providers/useAuth'
import { VscSignOut } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'

const Profile = ({isToggle, toggle}) => {
  const { users } = useAuth()
  const navigate = useNavigate()
  return (
    <div className={isToggle ? 'mob-menuProfile active' : 'mob-menuProfile'}>
      <span onClick={toggle} className='close'>&times;</span>
      <img src={users.photo} alt="No photo" />
      <p onClick={() => navigate('/admin')}>{users.name}</p>
      <hr />
      <h4 onClick={() => {
        handleSignOut()
        window.location.reload()
      }}>
        <span>
          <VscSignOut/> 
        </span>
        Выйти
      </h4>
    </div>
  )
}

export default Profile;