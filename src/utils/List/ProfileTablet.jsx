import React from 'react'
import { handleSignOut } from '../../firebase'
import { useAuth } from '../../providers/useAuth'
import { VscSignOut } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'

const ProfileTablet = ({isToggle, toggle}) => {
  const { users } = useAuth()
  const navigate = useNavigate()

  return (
    <div className={isToggle ? 'tabletProfile active' : 'tabletProfile'}>
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
        <span>
          Выйти
        </span>
      </h4>
    </div>
  )
}

export default ProfileTablet