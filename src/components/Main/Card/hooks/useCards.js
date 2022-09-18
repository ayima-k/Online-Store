import React from 'react'
import { getCards } from "../../../../api";
import Loader from '../../../Loader'

const useCards = () => {
  const [cards, setCards] = React.useState(null)

  const [updateUseEffect, setUpdateUseEffect] = React.useState(null)

  React.useEffect(() => {
    getCards()
    .then(res => {
      const data = res ? Object.entries(res).map(([id, rest]) => {
        return {
          id,
          ...rest
        }
      }) : []
      setCards(data)
    })
  }, [updateUseEffect])

  if(!cards) return <Loader/>

  return {
    cards
  }
}

export default useCards