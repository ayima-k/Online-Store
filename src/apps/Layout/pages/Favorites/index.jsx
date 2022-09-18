import React from 'react'
import Navbar from '../../../../components/Header/Navbar/Navbar'
import { useMediaQuery } from 'react-responsive'
import IsMobile from '../../../../components/Header/IsMobile'
import cls from './Favorites.module.scss'
import { RiDeleteBin4Line } from 'react-icons/ri'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { addToBasket, getFavorites, getUser, removeFromCart, removeFromFavorites } from '../../../../api'
import { useAuth } from '../../../../providers/useAuth'
import { AiFillStar } from 'react-icons/ai'
import useAlerts from '../../../../components/useAlerts'
import Loader from '../../../../components/Loader'
import BasketBtn from '../../../../components/Main/Card/Btn/BasketBtn'
import { Button, IconButton } from '@mui/material'
import CardMore from '../CardMore/CardMore'

const Favorites = () => {
  const { actions } = useAlerts()

  const [cards, setCards] = React.useState(null)

  const { users } = useAuth()

  const navigate = useNavigate()

  const isMobile = useMediaQuery({
    query: "(max-width: 425px)"
  })
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)"
  })
  
  React.useEffect(() => {
    getUser(users?.uid)
    .then(r => r?.favorites)
    .then(res => {
      const newData = res ? Object.entries(res).map(([id, rest]) => {
        return {
          id,
          ...rest
        } 
      }) : false
      setCards(newData)
    })
  }, [users?.uid])

  console.log(cards);


  const handleAddToBasket = id => {
    actions.sweetAlert('Добавлено в корзину')
		const basketProduct = cards?.find((item) => item.id === id)
    basketProduct.page = false
    addToBasket(basketProduct, users.uid, id)
    getUser(users.uid)
    .then(r => r.favorites)
    .then(res => {
      const newData = res ? Object.entries(res).map(([id, rest]) => {
        return {
          id,
          ...rest
        }
      }) : []
      setCards(newData)
    })
  }

  const removeFromBasket = id => {
    actions.sweetAlert('Удалено из корзины')
		removeFromCart(users.uid, id)
    getUser(users.uid)
    .then(r => r.favorites)
    .then(res => {
      const newData = res ? Object.entries(res).map(([id, rest]) => {
        return {
          id,
          ...rest
        }
      }) : []
      setCards(newData)
    })
  }

  function setBasket(id) {
    return cards?.map((item) => {
      Object.entries(item).flat(1).map((item) => {
        return typeof item == 'object' && {
          ...item,
          basket: item.id === id ? !item.basket : item.basket,
        }
      })
    })
  }

  const removeFavorites = (id) => {
		actions.sweetAlert('Удалено из избранных')
		removeFromFavorites(users.uid, id)
    getFavorites(users.uid)
    .then(res => {
      const newData = res ? Object.entries(res).map(([ , rest]) => {
        return {
          ...rest
        } 
      }) : false
      setCards(newData)
      console.log(newData);
    })
	}

  return (
    <React.Fragment>
      {
        isMobile && (
          <>
            <IsMobile baseToSearch={cards}/>
            <div className={cls.headerBlock} key={cards}>
              <IconButton className={cls.goBackMobile} onClick={() => navigate('/')}>
                <span><IoMdArrowBack/></span>
              </IconButton>
              <h2>Избранное</h2>
            </div>
            {
              cards === false ? <h3 style={{color: 'gray', textAlign: 'left', marginTop: '4rem', marginLeft: '5rem'}} className={cls.h3}>Ещё ничего не дoбавлено</h3> : !cards && (
                <div className={cls.loaderBlock}>
                  <Loader/>
                </div>
              )
            }
            {
              cards && (
                <div className={cls.container} key={cards?.map(({id}) => id+Math.random(0,10000))}>
                  <div className={cls.row}>
                    {
                      cards?.map(item => {
                          return (
                            <div className={cls.card} key={item.id}>
                              <div className={cls.cardImg}>
                                <img 
                                  src={item.url} 
                                  className={cls.image} 
                                  alt=""
                                />
                              </div>
                              <div className={cls.cardBody}>
                                <div>
                                  <p className={cls.price}>{item.price} cом</p>
                                  <p className={cls.cardTitle}>{item.name}</p>
                                </div>
                                <ul className={cls.iconList}>
                                  <li>
                                    <RiDeleteBin4Line
                                      onClick={() => removeFavorites(item?.id)}
                                    />
                                  </li>
                                  <li>
                                    <BasketBtn
                                      setBasket={setBasket}
                                      cardId={item?.id}
                                      removeFromBasket={removeFromBasket}
                                      handleAddToBasket={handleAddToBasket}
                                      cardList={cards}
                                    />
                                  </li>
                                </ul>
                              </div>
                              <div className={cls.cardFooter}>
                                <Button 
                                  variant="outlined" 
                                  className={cls.btnMore}
                                  onClick={() => {
                                    navigate(`/cards/${item?.id}`)
                                    return (<CardMore page={'favorite'} idForPage={item?.id}/>)
                                  }}
                                >
                                  Подробнее
                                </Button>                                
                                <div className={cls.sizeBlock}>
                                  <p>
                                    {item?.size == 'Не выбран' ? '' : `Размер: ${item?.size}`}
                                  </p>
                                </div>
                                <div>
                                    <AiFillStar/>
                                  </div>
                              </div>
                            </div>
                          )
                      })
                    }
                  </div>
                </div>
              )
            }
          </>
        )
      }
      {
        isTablet && (
          <>
            <Navbar baseToSearch={cards}/>
            <div className={cls.headerBlock} key={cards}>
              <div>
                <IconButton className={cls.goBack} onClick={() => navigate('/')}>
                  <span><IoMdArrowBack/></span>
                </IconButton>
              </div>
              <h1>Избранное</h1>
            </div>
            {
              cards === false ? <h3 style={{color: 'gray', textAlign: 'left', marginTop: '4rem', marginLeft: '5rem'}}>Ещё ничего не дoбавлено</h3> : !cards && (
                <div className={cls.loaderBlock}>
                  <Loader/>
                </div>
              )
            }
            {
              cards && (
                <div className={cls.container} key={cards?.map(({id}) => id+=1)}>
                  <div className={cls.row} key={cards}>
                    {
                      cards?.map(item => {
                        return (
                          <div className={cls.card} key={item?.id}>
                            <div className={cls.cardImg}>
                              <img 
                                src={item?.url} 
                                className={cls.image} 
                                alt=""
                              />
                            </div>
                            <div className={cls.cardBody}>
                              <div>
                                <p className={cls.price}>{item?.price} cом</p>
                                <p className={cls.cardTitle}>{item?.name}</p>
                              </div>
                              <ul className={cls.iconList}>
                                <li>
                                  <RiDeleteBin4Line
                                    onClick={() => removeFavorites(item?.id)}
                                  />
                                </li>
                                <li>
                                  <BasketBtn
                                    setBasket={setBasket}
                                    cardId={item?.id}
                                    removeFromBasket={removeFromBasket}
                                    handleAddToBasket={handleAddToBasket}
                                    cardList={cards}
                                  />
                                </li>
                              </ul>
                            </div>
                            <div className={cls.cardFooter}>
                              <Button 
                                variant="outlined" 
                                className={cls.btnMore}
                                onClick={() => {
                                  navigate(`/cards/${item?.id}`)
                                }}
                              >
                                Подробнее
                              </Button>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            }
          </>
        )
      }
    </React.Fragment>
  )
}

export default Favorites