import React from 'react'
import Profile from '../../../components/utils/List/ProfileTablet'
import List from '../../../components/utils/List'
import CardTemplate from '../../Main/Card/CardTemplate'
import { useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineHeart } from 'react-icons/ai'
import { AiOutlineShopping } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineSearch } from 'react-icons/ai'
import { IconButton, TextField } from '@mui/material'
import cls from './Navbar.module.scss'


const Navbar = ({baseToSearch}) => {
  const navigate = useNavigate()

  const [value, setValue] = React.useState('.')
  const finded = baseToSearch && baseToSearch?.filter(item => item?.name?.toUpperCase()?.includes(value !== '' && value.toUpperCase()))

  const [isToggle, setIsToggle] = React.useState(false)
  const [isToggleProfile, setIsToggleProfile] = React.useState(false)
  const toggle = () => setIsToggle(prev => !prev)
  const toggleProfile = () => setIsToggleProfile(prev => !prev)


  return (
    <>
      <div className={cls.navbarTablet}>
        <div>
          <IconButton onClick={toggle} className={cls.bars}><GiHamburgerMenu /></IconButton>
        </div>
        <div>
          <AiOutlineSearch className={cls.searchIcon}/>
          <TextField 
              id="standard-basic" 
              label="Поиск" 
              onChange={e => setValue(e.target.value)}
              color='secondary'
              type="text"
              className={cls.searchInput} variant="standard">
          </TextField>
          <span>
            <IconButton onClick={toggleProfile}><CgProfile /></IconButton>
            <Profile isToggle={isToggleProfile} toggle={toggleProfile}/>
          </span>
          <span><IconButton onClick={() => navigate('/favorites')}><AiOutlineHeart/></IconButton></span>
          <span><IconButton  onClick={() => navigate('/basket')}><AiOutlineShopping/></IconButton></span>
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