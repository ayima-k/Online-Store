import React from 'react'
import { AiFillShopping, AiOutlineShopping } from 'react-icons/ai'
import { getSingleFromBasket } from '../../../../../api'
import { useAuth } from '../../../../../providers/useAuth'

const BasketBtn = ({cardId, setBasket, cardList, handleAddToBasket, removeFromBasket}) => {
  const { users } = useAuth()
  const [isInBasket, setIsInBasket] = React.useState(false)

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
				<AiOutlineShopping
					onClick={() => {
						setBasket(cardId)
						handleAddToBasket(cardId)
					}}
				/>
			) : (
				<AiFillShopping
					onClick={() => {
						setBasket(cardId)
						removeFromBasket(cardId)
					}}
				/>
			)}
		</>
  )
}

export default BasketBtn