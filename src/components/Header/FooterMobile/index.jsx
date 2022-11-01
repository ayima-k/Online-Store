import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineShopping } from 'react-icons/ai'
import List from '../../../components/utils/List'
import Profile from '../../../components/utils/List/Profile'
import cls from './Footer.module.scss'
import '../Header.scss'

const FooterMobile = () => {
  const navigate = useNavigate()

  const [isToggle, setIsToggle] = React.useState(false)
  const [isToggleProfile, setIsToggleProfile] = React.useState(false)
  const toggle = () => setIsToggle(prev => !prev)
  const toggleProfile = () => setIsToggleProfile(prev => !prev)

  return (
    <>
      <div className={cls.footerMobile}>
        <div>
          <AiOutlineHome onClick={() => navigate('/')}/>
        </div>
        <div>
          <AiOutlineHeart onClick={() => navigate('/favorites')}/>
        </div>
        <div>
          <CgProfile onClick={toggleProfile}/>
          <Profile isToggle={isToggleProfile} toggle={toggleProfile}/>
        </div>
        <div>
          <AiOutlineShopping onClick={() => navigate('/basket')}/>
        </div>
        <div>
          <GiHamburgerMenu onClick={toggle}/>
        </div>
      </div>
      <List isToggle={isToggle} toggle={toggle}/>
    </>
  )
}

export default FooterMobile;