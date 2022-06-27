import React from 'react'
import { IoWomanOutline } from 'react-icons/io5'
import { IoManOutline } from 'react-icons/io5'
import { MdChildCare } from 'react-icons/md'
import { GiConverseShoe } from 'react-icons/gi'
import { useMediaQuery } from 'react-responsive'
import useCards from '../../components/Main/Card/useCards'
import CardTemplate from '../../components/Main/Card/CardTemplate'

const List = ({isToggle, toggle}) => {
  
  const { cards } = useCards()

  const isMobile = useMediaQuery({
    query: "(max-width: 425px)"
  })
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)"
  })

  const [value, setValue] = React.useState('')

  const filtered = cards?.filter(item => item.category === value)

  return (
    <>
      {
        isMobile && (
          <div className={isToggle ? 'mob-menu active' : 'mob-menu'}>
            <span onClick={toggle} className='close'>&times;</span>
            <ul className='list'>
              <li onClick={() => {
                setValue('woman')
              }}> 
                <span><IoWomanOutline/></span> 
                Женщинам
              </li>
              <li onClick={() => {
                setValue('man')
              }}> 
                <span><IoManOutline/></span>
                Мужчинам
              </li>
              <li onClick={() => {
                setValue('kid')
              }}> 
                <span><MdChildCare/></span> 
                Детям
              </li>
              <li onClick={() => {
                setValue('shoes')
              }}> 
                <span><GiConverseShoe/></span> 
                Обувь
              </li>
            </ul>
          </div>
        )
      }
      {
        isTablet && (
          <div className={isToggle ? 'tablet-menu active' : 'tablet-menu'}>
            <span onClick={toggle} className='close'>&times;</span>
            <ul className='list'>
              <li style={value == 'woman' ? {color: '#514A7E'} : {color: 'white'}} onClick={() => {
                setValue('woman')
              }}> 
                <span><IoWomanOutline/></span> 
                Женщинам
              </li>
              <li style={value == 'man' ? {color: '#514A7E'} : {color: 'white'}} onClick={() => {
                setValue('man')
              }}> 
                <span><IoManOutline/></span> 
                Мужчинам
              </li>
              <li style={value == 'kid' ? {color: '#514A7E'} : {color: 'white'}} onClick={() => {
                setValue('kid')
              }}> 
                <span><MdChildCare/></span> 
                Детям
              </li>
              <li style={value == 'shoes' ? {color: '#514A7E'} : {color: 'white'}} onClick={() => {
                setValue('shoes')
              }}> 
                <span><GiConverseShoe/></span> 
                Обувь
              </li>
            </ul>
          </div>
        )
      }
      <h1 className='titleCategory'>{value}</h1>
      <div className='containerCategory'>
        <div className='rowCategory'>
          {
            filtered?.length == 5 ? filtered.map(({name, price, category, basket, favorite, url, id}) => {
              return (
                <CardTemplate key={id} name={name} price={price} category={category} basket={basket} favorite={favorite} url={url} id={id}/>
              )
            }) : ''
          }
        </div>
      </div>
    </>
  )
}

export default List