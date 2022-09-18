import React from 'react'
import cls from './IsMobile.module.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import FooterMobile from '../FooterMobile'
import List from '../../../utils/List'
import CardTemplate from '../../Main/Card/CardTemplate'
import { TextField } from '@mui/material'

const IsMobile = ({baseToSearch}) => {

  const [value, setValue] = React.useState('.')
  const [isToggle, setIsToggle] = React.useState(false)

  const toggle = () => setIsToggle(prev => !prev)
  
  const finded = baseToSearch && baseToSearch?.filter(item => item?.name?.toUpperCase()?.includes(value !== '' && value.toUpperCase()))
  return (
    <>
      <div className={cls.header}>
        <div className={cls.navbar}>
          <AiOutlineSearch className={cls.searchIcon}/>
          <TextField
              id="standard-basic" 
              label="Поиск" 
              onChange={e => setValue(e.target.value)}
              color='secondary'
              type="text"
              className={cls.searchInput} variant="standard">
          </TextField>
        </div>
        <FooterMobile/>
      </div>
      <div className={cls.container}>
        {
          finded?.length < 20 ? finded.map(({name, price, category, basket, favorite, url, id}) => {
            return <CardTemplate key={id} name={name} price={price} category={category} basket={basket} favorite={favorite} url={url} id={id}/>
          }) : ''
        }
      </div>
      <List isToggle={isToggle} toggle={toggle}/>
    </>
  )
}

export default IsMobile