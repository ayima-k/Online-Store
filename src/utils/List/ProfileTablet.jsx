import React from 'react'
import { handleSignOut } from '../../firebase'
import { useAuth } from '../../providers/useAuth'
import { VscSignOut } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../api'
import { Button } from '@mui/material'

const ProfileTablet = ({isToggle, toggle}) => {
  const { users } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    getUser(users.uid)
      .then(r => {
        users.name = r.name
        users.photo = r.photo
      })
  }, [users])

  return (
    <div className={isToggle ? 'tabletProfile active' : 'tabletProfile'}>
      {
        users.photo?.length >= 9 ?
          <img src={users.photo} alt="No photo" />
        : (
          <img src='https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg' alt="" />
        )
      }
      <Button onClick={() => navigate(`/profile/${users.uid}`)} variant='outlined' style={{whiteSpace: 'nowrap', fontSize: '10px', padding: '0 10px', textAlign: 'center', marginBottom: '-15px', height: '30px', color: 'black', marginLeft: '28%', border: '1px solid black'}}>Профиль</Button>
      <p onClick={() => navigate('/admin')}>{users.name}</p>
      <hr />
      <h4 
        onClick={() => {
          handleSignOut()
          window.location.reload()
        }}
        style={{marginTop: '-10px'}}
      >
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