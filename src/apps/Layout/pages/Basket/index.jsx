import React from 'react'
import Navbar from '../../../../components/Header/Navbar/Navbar'
import { useMediaQuery } from 'react-responsive'
import IsMobile from '../../../../components/Header/IsMobile'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import cls from './Basket.module.scss'
import { useAuth } from '../../../../providers/useAuth'
import { addOrder, addToFavorites, getBasket, getCards, getSingleFromBasket, getSingleProduct, getUser, postOrder, removeAllCart, removeFromCart, removeFromFavorites, updateCount, updatePage, updateTotal } from '../../../../api'
import Loader from '../../../../components/Loader'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import FavoriteBtn from '../../../../components/Main/Card/Btn/FavoriteBtn'
import { RiDeleteBin4Line } from 'react-icons/ri'
import useAlerts from '../../../../components/useAlerts'
import { Button, IconButton } from '@mui/material'
import CardMore from '../CardMore/CardMore.jsx'
import Size from '../CardMore/Size.jsx'

const Basket = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 425px)"
  })
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)"
  })
  
  const { actions } = useAlerts()
  const { users } = useAuth()
  const navigate = useNavigate()
  const [cards, setCards] = React.useState(null)
  const [value, setValue] = React.useState(null)
  const [total, setTotal] = React.useState({
    priceTotal: cards && cards.reduce((prev, curr) => {
      return prev + curr?.priceTotal
    }, 0) 
    ,
    count: cards && cards.reduce((prev, curr) => {
      return prev + curr?.count
    }, 1)
  })

  React.useEffect(() => {
    getUser(users?.uid)
    .then(r => r?.basket)
    .then(res => {
      const newData = res ? Object.entries(res).map(([ , rest]) => {
        return {
          ...rest
        } 
      }) : false
      setCards(newData)
    })
    setTotal({
      priceTotal: cards && cards.reduce((prev, curr) => prev + curr?.priceTotal, 0),
      count: cards && cards.reduce((prev, curr) => prev + curr?.count, 0),
    });
  }, [users.uid, cards])

  const increase = (id) => {
    getSingleFromBasket(users?.uid, id)
    .then(r => {
      console.log(r);
      updateCount({count: r.count + 1}, users?.uid, id)
      .then(() => getCards())
      updateTotal({priceTotal: (r.count + 1) * r.price}, users?.uid, id)
      .then(() => getCards())
    })
	}

	const decrease = (id) => {
		getSingleFromBasket(users?.uid, id)
    .then(r => {
      if (r.count !== 1) {
        updateCount({count: r.count - 1}, users?.uid, id)
        .then(() => getCards())
        updateTotal({priceTotal: r.priceTotal - r.price}, users?.uid, id)
        .then(() => getCards())
      }
    })
	}

	const changeValue = (id, value) => {
		getSingleProduct(id)
    .then(r => {
      r.id == id && setValue(value)
      setCards(r => {
        updateCount({count: value}, users?.uid, id)
        .then(getCards)
        updateTotal({priceTotal: value * r?.map(item => item.id == id && item.price).map(item => typeof item == 'number' ? item : null).filter((number) => typeof number == 'number')[0]}, users?.uid, id)
        .then(getCards)
      })
    })
	}

  const handleAddToFavorite = (id) => {
		actions.sweetAlert('Добавлено в избранное')
		const favoriteProduct = cards.map(item => {
      return Object.entries(item).flat(1).map(item => typeof item == 'object' && item).find(item => item.id == id)
    }).map(item => typeof item == 'object' ? item : null)
    favoriteProduct?.map(item => {addToFavorites(item, users.uid, id)})
    getUser(users.uid)
    .then(r => r.vasket)
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

  const removeFavorites = (id) => {
		actions.sweetAlert('Удалено из избранных')
		removeFromFavorites(users.uid, id)
    getUser(users.uid)
    .then(r => r.basket)
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

  function setLike(id) {
    return cards?.map((item) => {
      return {
        ...item,
				favorite: item.id === id ? !item.favorite : item.favorite,
      }
    })
	}

  const removeFromBasket = id => {
    actions.sweetAlert('Удалено из корзины')
		removeFromCart(users.uid, id)
    getBasket(users.uid)
    .then(res => {
      console.log(res);
      const newData = res ? Object.entries(res).map(([id, rest]) => {
        return {
          ...rest
        } 
      }) : false
      setCards(newData)
    })
  }

  const removeAll = () => {
    removeAllCart(users.uid)
    getBasket(users.uid)
    .then(res => {
      const newData = res ? Object.entries(res).map(([id, rest]) => {
        return {
          ...rest
        } 
      }) : false
      setCards(newData)
    })
  }


  const handleOrder = () => {
    if (cards.map(item => item.size.length === 1 || item.size.length === 2)[0]) {
      // cards.map(item => postOrder(item, users.uid, item?.id))
      cards.map(item => addOrder({item, users}, item?.id))
      removeAll()
      actions.sweetAlert('Ваш заказ обрабатывается')
    } else {
      actions.sweetAlert('Выберите размер!')
    }
  }
  
  return (
    <React.Fragment>
      {
        isMobile && (
          <div key={cards}>
            <IsMobile baseToSearch={cards}/>
            <div className={cls.headerBlock}>
              <IconButton className={cls.goBackMobile} onClick={() => navigate(-1)}>
                <span><IoMdArrowBack/></span>
              </IconButton>
              <h2>Корзина</h2>
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
                <div className={cls.dFlexMobile} key={cards?.map(({id}) => id)}>
                  <div className={cls.container}>
                    <div className={cls.row}>
                      {
                        cards?.map(item => {
                          return (
                            <div key={item.id}>
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
                                        onClick={() => removeFavorites(item.id)}
                                      />
                                    </li>
                                    <li>
                                      <FavoriteBtn
                                        setLike={setLike}
                                        cardId={item.id}
                                        removeFromFavorites={removeFromFavorites}
                                        handleAddToFavorite={handleAddToFavorite}
                                        cardList={cards}
                                      />
                                    </li>
                                  </ul>
                                </div>
                                <div className={cls.count}>
                                  <div className={cls.count__controls}>
                                    <Button variant={item?.count === 1 ? 'disabled' : 'outlined'} className={cls.count__down} onClick={()=>{decrease(item?.id)}}>
                                      <span><AiOutlineMinus/></span>
                                    </Button>
                                    <div className={cls.count__box}>
                                      <input 
                                        onChange={e => {
                                          changeValue(item?.id, +e.target.value)
                                        }}
                                        type='number' 
                                        className={cls.count__input} 
                                        min='1'
                                        max='100'
                                        value={value ? value : item?.count}
                                      />
                                    </div>
                                    <div className={cls.count__up} onClick={()=>{increase(item?.id)}}>
                                      <IconButton >
                                        <span><AiOutlinePlus/></span>
                                      </IconButton>
                                    </div>
                                  </div>
                                </div>
                                <div className={cls.cardFooter}>
                                  <Button 
                                    variant="outlined" 
                                    className={cls.btnMore}
                                    onClick={() => {
                                      navigate(`/cards/${item?.id}`)
                                      return (<CardMore page={'basket'} idForPage={item?.id}/>)
                                    }}
                                  >
                                    Подробнее
                                  </Button>
                                  <div>
                                    <AiFillStar/>
                                  </div>
                                </div>
                                <div className={cls.sizeBlock}>
                                  <p>
                                    {item?.size == 'Не выбран' ? '' : `Размер: ${item?.size}`}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) 
                        })
                      }
                    </div>
                  </div>
                  <div className={cls.orderingMobile}>
                    <div className={cls.summa}>
                      <h3>Итого</h3>
                      <h3>{total.priceTotal} сом</h3>
                    </div>
                    <div className={cls.amount}>
                      <p>Товары</p>
                      <p>{total.count} шт.</p>
                    </div>
                    <div className={cls.orderBtn}>
                      <Button variant="contained" onClick={() => handleOrder()}>Заказать</Button>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        )
      }
      {
        isTablet && (
          <div key={cards}>
            <Navbar baseToSearch={cards && cards}/>
            <div className={cls.headerBlock} key={cards+'fde'}>
              <div>
                <IconButton className={cls.goBack} onClick={() => navigate(-1)}>
                  <span><IoMdArrowBack/></span>
                </IconButton>
              </div>
              <h1>Корзина</h1>
            </div>
            {
              cards == false ? <h3 style={{color: 'gray', textAlign: 'left', marginTop: '4rem', marginLeft: '5rem'}}>Ещё ничего не дoбавлено</h3> : !cards && (
                <div className={cls.loaderBlock}>
                  <Loader/>
                </div>
              )
            }
            {
              cards && (
                <div className={cls.dFlex} key={cards+'yu'}>
                  <div className={cls.container} key={cards+'yujt'}>
                    <div className={cls.row} key={cards+'ryjyt'}>
                      {
                        cards?.map(item => {
                          return (
                            <div key={item?.id}>
                              <div className={cls.card} key={item?.id}>
                                <div className={cls.cardImg}>
                                  <img 
                                    src={item?.url} 
                                    className={cls.image} 
                                    alt=""
                                  />
                                </div>
                                <div className={cls.cardBody}>
                                  <div className={cls.bodyHeader}>
                                    <div>
                                      <b className={cls.price}>{item?.priceTotal} cом</b>
                                      <p className={cls.cardTitle}>{item?.name}</p>
                                    </div>
                                    <ul className={cls.iconList}>
                                      <li>
                                        <FavoriteBtn
                                          setLike={setLike}
                                          cardId={item?.id}
                                          removeFavorites={removeFavorites}
                                          handleAddToFavorite={handleAddToFavorite}
                                          cardsList={cards}
                                        />
                                      </li>
                                      <li>
                                        <RiDeleteBin4Line
                                          onClick={() => removeFromBasket(item?.id)}
                                        />
                                      </li>
                                    </ul>
                                  </div>
                                  <div className={cls.count}>
                                    <div className={cls.count__controls}>
                                      <Button variant={item?.count === 1 ? 'disabled' : 'outlined'} className={cls.count__down} onClick={()=>{decrease(item?.id)}}>
                                        <span><AiOutlineMinus/></span>
                                      </Button>
                                      <div className={cls.count__box}>
                                        <input 
                                          onChange={e => {
                                            changeValue(item?.id, +e.target.value)
                                          }}
                                          type='number' 
                                          className={cls.count__input} 
                                          min='1'
                                          max='100'
                                          value={value ? value : item?.count}
                                        />
                                      </div>
                                      <div className={cls.count__up} onClick={()=>{increase(item?.id)}}>
                                        <IconButton >
                                          <span><AiOutlinePlus/></span>
                                        </IconButton>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={cls.cardFooter}>
                                    <Button 
                                      variant="outlined" 
                                      className={cls.btnMore}
                                      onClick={() => {
                                        updatePage({page: true} , users.uid, item?.id)
                                        navigate(`/cards/${item?.id}`)
                                      }}
                                    >
                                      Подробнее
                                    </Button>
                                  </div>
                                  <div className={cls.sizeBlock}>
                                    <p>
                                      {item?.size == 'Не выбран' ? '' : `Размер: ${item?.size}`}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                  <div className={cls.ordering} key={cards+'fedf'}>
                    <div className={cls.summa}>
                      <h3 className={cls.itogo}>Итого</h3>
                      <h3>{total.priceTotal} сом</h3>
                    </div>
                    <div className={cls.amount}>
                      <p>Товары</p>
                      <p>{total.count} шт.</p>
                    </div>
                    <div className={cls.orderBtn}>
                      <Button variant="contained" onClick={() => handleOrder()}>Заказать</Button>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        )
      }
    </React.Fragment>
  )
}

export default Basket