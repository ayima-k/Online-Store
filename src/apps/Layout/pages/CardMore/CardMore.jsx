import React from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../../../providers/useAuth'
import { addReview, addToBasket, addToFavorites, getSingleProduct, putReview, removeFromCart, removeFromFavorites } from '../../../../api'
import { Button, Rating, TextField, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import useAlert from '../../../../components/useAlerts'
import Navbar from '../../../../components/Header/Navbar/Navbar'
import IsMobile from '../../../../components/Header/IsMobile'
import Reviews from './Reviews'
import BasketMoreBtn from '../../../../components/Main/Card/Btn/BasketMoreBtn/BasketMoreBtn'
import FavoriteBtn from '../../../../components/Main/Card/Btn/FavoriteBtn'
import Size from './Size.jsx'
import cls from './CardMore.module.scss'

const CardMore = () => {
  const [data, setData] = React.useState(null)
  const [reviewsData, setReviewsData] = React.useState(null)
  const [toggle, setToggle] = React.useState(false)
  const navigate = useNavigate()
  const { actions } = useAlert()
  const { users } = useAuth()
  const [value, setValue] = React.useState('')
  const [valueRating, setValueRating] = React.useState(0)
  const { id } = useParams()

  const getProduct = () => {
    getSingleProduct(id)
    .then(res => {
      if (res) {
        setData(() => {
          return {
            ...res,
            id: id
          }
        })
        res.reviews && setReviewsData(() => {
          return Object.entries(res.reviews).map(([id, item]) => {
            return {
              id,
              ...item
            }
          })
        })
      }
    })
  }

  const handleAddReview = () => {
    const newData = {
			date: new Date().toLocaleString(),
			content: value,
			grade: valueRating,
			user: {
				photo: users?.photo,
				name: users?.name,
				email: users?.email,
			},
		}
		addReview(newData, id)
    .then((r) => {
			if (r) {
				const reviewData = {
					content: newData.content,
					grade: valueRating,
					date: newData.date,
					name: data.name,
					id: id,
					category: data.category,
					url: data.url,
				}
				putReview(reviewData, users?.uid, id)
        .then(() => {
          getProduct()
          setValueRating(0)
          setValue('')
        })
        actions.sweetAlert('Вы успешно добавили отзыв')
			}
		})
  }

  React.useEffect(() => {
    getProduct()
  }, [data])

  const isMobile = useMediaQuery({
    query: "(max-width: 425px)"
  })
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)"
  })

  const handleAddToFavorite = (id) => {
		actions.sweetAlert('Добавлено в избранное')
		addToFavorites(data, users.uid, id)
    getProduct()
	}

  const removeFavorites = (id) => {
		actions.sweetAlert('Удалено из избранных')
		removeFromFavorites(users.uid, id)
    getProduct()
	}

  function setLike() {
    setData(item => {
      return {
        ...item,
        favorite: true
      }
    })
	}

  const handleAddToBasket = id => {
    actions.sweetAlert('Добавлено в корзину')
    data.page = false
		addToBasket(data, users.uid, id)
    getProduct()
    
  }

  const removeFromBasket = id => {
    actions.sweetAlert('Удалено из корзины')
		removeFromCart(users.uid, id)
    getProduct()
  }

  function setBasket(id) {
    setData(item => {
      return {
        ...item,
				basket: true
      }
    })
  }

  return (
    <React.Fragment>
      {
        isMobile && (
          <>
            <IsMobile/>
            <div className={cls.moreMobileBlock}>
              <div className={cls.header}>
                <div className={cls.goBack} onClick={() => navigate(-1)}>
                  <IoMdArrowBack/>
                </div>
                <h2>{data?.name}</h2>
              </div>
              <div className={cls.body}>
                <div className={cls.image}>
                  <img src={data?.url} alt="" />
                </div>
                <div className={cls.description}>
                  <div className={cls.price}>
                    <h1>{data?.price} сом</h1>
                  </div>
                  <Size/>
                  <div className={cls.adding}>
                    <span>
                      <li>
                        <BasketMoreBtn
                          setBasket={setBasket}
                          cardId={id}
                          removeFromBasket={removeFromBasket}
                          handleAddToBasket={handleAddToBasket}
                          cardList={data}
                        />
                      </li>
                      <IconButton>
                        <FavoriteBtn
                          setLike={setLike}
                          cardId={data?.id}
                          removeFavorites={removeFavorites}
                          handleAddToFavorite={handleAddToFavorite}
                          cardsList={data}
                        />
                      </IconButton>
                    </span>
                  </div>
                  <div className={cls.text}>
                    <p>Описание</p>
                    <h3>
                      {data?.description}
                    </h3>
                  </div>
                  <div className={cls.reviewBtn}>
                    <p onClick={() => setToggle(prev => !prev)}>Добавить отзыв</p>
                    {
                      toggle ? (
                        <div className={cls.review}>
                          <TextField onChange={e => setValue(e.target.value)} value={value} id="standard-basic" label="Отзыв" variant="standard"/>
                          <Box
                            sx={{
                              '& > legend': { mt: 2 },
                            }}
                          >
                            <Rating
                              name="simple-controlled"
                              value={valueRating}
                              className={cls.rating}
                              onChange={(event, newValue) => {
                                setValueRating(newValue);
                              }}
                            />
                          </Box>
                          <Button variant={value != '' && valueRating != '' ? "contained" : "disabled"} className={cls.save} onClick={handleAddReview}>Сохранить</Button>
                        </div>
                      ) : ''
                    }
                  </div>
                </div>
              </div>
              <div className={cls.reviews}>
                {reviewsData && <Typography variant='h4'>Отзывы о товаре</Typography>}
                {reviewsData ? (
                  reviewsData.reverse().map((item, index) => (
                    <Reviews
                      key={index}
                      photo={item.user.photo}
                      grade={item.grade}
                      name={item.user.name}
                      date={item.date}
                      content={item.content}
                    />
                  ))
                ) : ''}
              </div>
            </div>
          </>
        )
      }
      {
        isTablet && (
          <>
            <Navbar/>
            <div className={cls.moreBlock}>
              <div className={cls.header}>
                <div className={cls.goBack} onClick={() => navigate(-1)}>
                  <IoMdArrowBack/>
                </div>
                <h2>{data?.name}</h2>
              </div>
              <div className={cls.body}>
                <div className={cls.image}>
                  <img src={data?.url} alt="" />
                </div>
                <div className={cls.description}>
                  <div className={cls.price}>
                    <h1>{data?.price} сом</h1>
                  </div>
                  <Size/>
                  <div className={cls.adding}>
                    <span>
                      <li>
                        <BasketMoreBtn
                          setBasket={setBasket}
                          cardId={id}
                          removeFromBasket={removeFromBasket}
                          handleAddToBasket={handleAddToBasket}
                          cardList={data}
                        />
                      </li>
                      <IconButton>
                        <FavoriteBtn
                          setLike={setLike}
                          cardId={data?.id}
                          removeFavorites={removeFavorites}
                          handleAddToFavorite={handleAddToFavorite}
                          cardsList={data}
                        />
                      </IconButton>
                    </span>
                  </div>
                  <div className={cls.text}>
                    <p>Описание</p>
                    <h3>
                      {data?.description}
                    </h3>
                  </div>
                  <div className={cls.reviewBtn}>
                    <p onClick={() => setToggle(prev => !prev)}>Добавить отзыв</p>
                    {toggle ? (<div className={cls.review}>
                      <TextField onChange={e => setValue(e.target.value)} value={value} id="standard-basic" label="Отзыв" variant="standard"/>
                      <Box
                        sx={{
                          '& > legend': { mt: 2 },
                        }}
                      >
                        <Rating
                          name="simple-controlled"
                          value={valueRating}
                          className={cls.rating}
                          onChange={(event, newValue) => {
                            setValueRating(newValue);
                          }}
                        />
                      </Box>
                      <Button variant={value != '' && valueRating != '' ? "contained" : "disabled"} className={cls.save} onClick={handleAddReview}>Сохранить</Button>
                    </div>) : ''}
                  </div>
                </div>
              </div>
              <div className={cls.reviews}>
                {reviewsData && <Typography variant='h4'>Отзывы о товаре</Typography>}
                {reviewsData ? (
                  reviewsData.reverse().map((item, index) => (
                    <Reviews
                      id={id}
                      key={index}
                      photo={item.user.photo}
                      grade={item.grade}
                      name={item.user.name}
                      date={item.date}
                      content={item.content}
                    />
                  ))
                ) : ''}
              </div>
            </div>
          </>
        )
      }
    </React.Fragment>
  )
}

export default CardMore