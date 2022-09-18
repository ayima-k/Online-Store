import React from 'react'
import { Button } from '@mui/material'
import { getSingleFromBasket } from '../../../../../api'
import { useAuth } from '../../../../../providers/useAuth'
import cls from '.././../../../../apps/Layout/pages/CardMore/CardMore.module.scss'

const BasketMoreBtn = ({cardId, cardList, setBasket, handleAddToBasket, removeFromBasket}) => {

  const [isInBasket, setIsInBasket] = React.useState(false)
  const { users } = useAuth()

  React.useEffect(() => {
		getSingleFromBasket(users.uid , cardId)
    .then(r => {
			if (r){
				setIsInBasket(true)
			} else {
        setIsInBasket(false)
      }
		})
	}, [users.uid, cardId, cardList])

  

  return (
    <>
      {!isInBasket ? (
        <Button
          variant='filled' 
          className={cls.button}
          onClick={() => {
						setBasket(cardId)
						handleAddToBasket(cardId)
					}}
        >
          В корзину
        </Button>
			) : (
				<Button 
          variant='outlined' 
          className={cls.buttonText}
          onClick={() => {
						setBasket(cardId)
						removeFromBasket(cardId)
					}}
        >
          В корзине
        </Button>
			)}
    </>
  )
}

export default BasketMoreBtn