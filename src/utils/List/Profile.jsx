import React from 'react'
import { handleSignOut } from '../../firebase'
import { useAuth } from '../../providers/useAuth'
import { VscSignOut } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Profile = ({isToggle, toggle}) => {
  const { users } = useAuth()
  const navigate = useNavigate()
  return (
    <div className={isToggle ? 'mob-menuProfile active' : 'mob-menuProfile'}>
      <span onClick={toggle} className='close'>&times;</span>
      {
        users.photo.length > 9 ?
          <img src={users.photo} onClick={() => navigate(`/profile/${users.uid}`)} alt="No photo" />
        : (
          <img onClick={() => navigate(`/profile/${users.uid}`)} src='https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg' alt="No photo" />
        )
      }
      <Button className='profileBtn' onClick={() => navigate(`/profile/${users.uid}`)} variant='outlined' style={{whiteSpace: 'nowrap', fontSize: '10px', padding: '0 10px', textAlign: 'center', marginBottom: '-15px', height: '30px', color: 'black', marginLeft: '25%', border: '1px solid black'}}>Профиль</Button>
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