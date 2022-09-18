import React from 'react'
import { AiFillHeart , AiOutlineHeart} from 'react-icons/ai'
import { getSingleFavorite } from '../../../../../api'
import { useAuth } from '../../../../../providers/useAuth'

const FavoriteBtn = ({cardId, setLike, cardsList, handleAddToFavorite, removeFavorites}) => {

  const { users } = useAuth()
  const [isFavorite, setIsFavorite] = React.useState(false)

  React.useEffect(() => {
		getSingleFavorite(users.uid , cardId)
    .then(r => {
			if (r){
				setIsFavorite(true)
			} else {
        setIsFavorite(false)
      }
		})
	}, [users.uid, cardId, cardsList])

	return (
		<>
			{!isFavorite ? (
				<AiOutlineHeart
					onClick={() => {
						setLike(cardId)
						handleAddToFavorite(cardId)
					}}
				/>
			) : (
				<AiFillHeart
					onClick={() => {
						setLike(cardId)
						removeFavorites(cardId)
					}}
				/>
			)}
		</>
	);
}

export default FavoriteBtn