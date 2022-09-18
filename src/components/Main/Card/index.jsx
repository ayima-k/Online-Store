import React from 'react'
import useCards from './hooks/useCards';
import CardTemplate from './CardTemplate';

const Card = () => {
  
  const { cards } = useCards()

  return (
    <>
      {
        cards?.map(({name, price, category, url, id, size}) => {
          
          return <CardTemplate key={id} name={name} price={price} category={category} url={url} id={id} size={size}/>
        })
      }
    </>
  )
}

export default Card