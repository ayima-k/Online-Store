import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiOutlineShopping } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineSearch } from 'react-icons/ai'
import Profile from '../../../utils/List/ProfileTablet'
import List from '../../../utils/List'
import { useNavigate } from 'react-router-dom'
import cls from './Navbar.module.scss'
import useCards from '../../Main/Card/useCards'
import CardTemplate from '../../Main/Card/CardTemplate'


const Navbar = () => {
  const navigate = useNavigate()

  const { cards } = useCards()

  const [value, setValue] = React.useState('')

  const finded = cards?.filter(item => item.name.toUpperCase().includes(value.toUpperCase()))

  const [isToggle, setIsToggle] = React.useState(false)
  const [isToggleProfile, setIsToggleProfile] = React.useState(false)
  const toggle = () => setIsToggle(prev => !prev)
  const toggleProfile = () => setIsToggleProfile(prev => !prev)


  return (
    <>
      <div className={cls.navbarTablet}>
        <div>
          <GiHamburgerMenu onClick={toggle} className={cls.bars}/>
        </div>
        <div>
          <AiOutlineSearch className={cls.searchIcon}/>
          <input 
            onChange={e => setValue(e.target.value)}
            type="text" 
            placeholder='Поиск' 
            className={cls.searchInput}
          />
          <span>
            <CgProfile onClick={toggleProfile}/>
            <Profile isToggle={isToggleProfile} toggle={toggleProfile}/>
          </span>
          <span><AiOutlineHeart onClick={() => navigate('/favorites')}/></span>
          <span><AiOutlineShopping onClick={() => navigate('/basket')}/></span>
        </div>
      </div>    
      <div className={cls.container}>
        <div className={cls.row}>
          {
            finded?.length < 20 ? finded.map(({name, price, category, basket, favorite, url, id}) => {
              return <CardTemplate key={id} name={name} price={price} category={category} basket={basket} favorite={favorite} url={url} id={id}/>
            }) : ''
          }
        </div>
      </div>
      <List isToggle={isToggle} toggle={toggle}/>
    </>
  )
}

export default Navbar