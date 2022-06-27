import React from 'react'
import useCards from './useCards';
import CardTemplate from './CardTemplate';

const Card = () => {
  
  const { cards } = useCards()

  return (
    <>
      {
        cards?.map(({name, price, category, basket, favorite, url, id}) => {
          
          return <CardTemplate key={id} name={name} price={price} category={category} basket={basket} favorite={favorite} url={url} id={id}/>
        })
      }
    </>
  )
}

export default Card