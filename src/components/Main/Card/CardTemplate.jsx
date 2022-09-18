import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { addToBasket, addToFavorites, getCards, removeFromCart, removeFromFavorites } from '../../../api';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../providers/useAuth';
import FavoriteBtn from './Btn/FavoriteBtn';
import BasketBtn from './Btn/BasketBtn'
import  useAlerts  from '../../useAlerts'
import cls from './Card.module.scss'
import { Button } from '@mui/material';
import Size from '../../../apps/Layout/pages/CardMore/Size.jsx';

const CardTemplate = ({name, price, category, url, id, size}) => {
  const { actions } = useAlerts()
  const { users } = useAuth()
  const [card, setCard] = React.useState(null)

  const navigate = useNavigate()


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
      setCard(data)
    })
  }, [updateUseEffect])



  const handleAddToFavorite = (id) => {
		actions.sweetAlert('Добавлено в избранное')
		const favoriteProduct = card?.find((item) => item.id === id)
    const array = []
    array.push(favoriteProduct)
    console.log(array);
		addToFavorites(array[0], users.uid, id)
    getCards()
    .then(res => {
      const newData = res ? Object.entries(res).map(([id, rest]) => {
        return {
          id,
          ...rest
        }
      }) : []
      setCard(newData)
    })
	}

  const removeFavorites = (id) => {
		actions.sweetAlert('Удалено из избранных')
		removeFromFavorites(users.uid, id)
    getCards()
    .then(res => {
      const newData = res ? Object.entries(res).map(([id, rest]) => {
        return {
          id,
          ...rest
        }
      }) : []
      setCard(newData)
    })
	}

  function setLike(id) {
    return card?.map((item) => {
      return {
        ...item,
				favorite: item.id === id ? !item.favorite : item.favorite,
      }
    })
	}


  const handleAddToBasket = (id) => {
    actions.sweetAlert('Добавлено в корзину')
		const basketProduct = card?.find((item) => item.id === id)
    if (basketProduct.page) {
      basketProduct.page = false
    }
		addToBasket(basketProduct, users.uid, id)
    console.log(basketProduct);
    getCards()
    .then(res => {
      const newData = res ? Object.entries(res).map(([id, rest, page]) => {
        return {
          id,
          page: false,
          ...rest
        }
      }) : []
      setCard(newData)
    })
  }

  const removeFromBasket = id => {
    actions.sweetAlert('Удалено из корзины')
		removeFromCart(users.uid, id)
    getCards()
    .then(res => {
      const newData = res ? Object.entries(res).map(([id, rest]) => {
        return {
          id,
          ...rest
        }
      }) : []
      setCard(newData)
    })
  }

  function setBasket(id) {
    return card?.map((item) => {
      return {
        ...item,
				basket: item.id === id ? !item.basket : item.basket,
      }
    })
  }


  return (
    <div className={cls.card} key={id}>
      <div className={cls.cardImg}>
        <img 
          src={url} 
          className={cls.image} 
          alt=""
        />
      </div>
      <div className={cls.cardBody}>
        <div>
          <p className={cls.price}>{price} cом</p>
          <p className={cls.cardTitle}>{name}</p>
        </div>
        <ul className={cls.iconList}>
          <li>
            <FavoriteBtn
              setLike={setLike}
              cardId={id}
              removeFavorites={removeFavorites}
              handleAddToFavorite={handleAddToFavorite}
              cardsList={card}
            />
          </li>
          <li>
            <BasketBtn
              setBasket={setBasket}
              cardId={id}
              removeFromBasket={removeFromBasket}
              handleAddToBasket={handleAddToBasket}
              cardList={card}
            />
          </li>
        </ul>
      </div>
      <div className={cls.cardFooter}>
        <Button 
          variant="outlined" 
          className={cls.btnMore} 
          onClick={() => {
            navigate(`/cards/${id}`)
          }}
        >
          Подробнее
        </Button>
      </div>
    </div>
  )
}

export default CardTemplate