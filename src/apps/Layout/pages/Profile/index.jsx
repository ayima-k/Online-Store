import React from 'react'
import { useAuth } from '../../../../providers/useAuth'
import { updateProfile } from 'firebase/auth'
import { updateProfiles, getUser, deleteReviewUser, deleteReviews } from '../../../../api'
import { GrEdit } from 'react-icons/gr'
import { Box, Button, IconButton, Rating, TextField } from '@mui/material'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { upload } from '../../../../firebase'
import { AiFillDelete, AiFillFolderAdd } from 'react-icons/ai'
import useAlert from '../../../../components/useAlerts'
import Navbar from '../../../../components/Header/Navbar/Navbar.jsx'
import cs from './Profile.module.scss'
import { useMediaQuery } from 'react-responsive'
import IsMobile from '../../../../components/Header/IsMobile'

const Profile = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 425px)"
  })
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)"
  })

  const { users } = useAuth()
  const navigate = useNavigate()
  const [toggle, setToggle] = React.useState(false)
  const [toggleReview, setToggleReview] = React.useState(false)
  const [toggleOrder, setToggleOrder] = React.useState(false)
  const { actions } = useAlert()
  const [name, setName] = React.useState('')
  const [photo, setPhoto] = React.useState('')
  const [review, setReview] = React.useState(null)
  const [orders, setOrders] = React.useState(null)

  const handleSubmit = () => {
    if (name == '' || photo == '') {
      actions.sweetAlert('Заполните все поля!') 
    } else {
      updateProfile(users, {
        displayName: name,
        photoURL: photo
      })
      updateProfiles({name, photo}, users?.uid) 
      upload(photo, users)
    }
  }

  React.useEffect(() => {
    if (users?.photo.length > 9) {
      setPhoto(users.photo)
    }
    getUser(users.uid)
    .then(r => {
      setPhoto(r.photo)
      setName(r.name)
    })
    getReviews()
    getOrders()
  }, [users])

  function getReviews() {
    getUser(users.uid)
    .then(r => {
      if (r.reviews) {
        const newData = Object.entries(r.reviews).map(([id, item]) => {
          return {
            id,
            ...item,
          }
        })
        setReview(newData)
      } else {
        setReview(null)
      }
    })
	}

  function deleteReview(id) {
    console.log(id);
		deleteReviewUser(users.uid, id)
    .then((res) => {
      res && getReviews()
    })
    actions.sweetAlert('Ваш отзыв удален')
	}

  function getOrders() {
    getUser(users.uid)
    .then(r => {
      if (r.orders) {
        const newData = Object.entries(r.orders).map(([id, item]) => {
          return {
            id,
            ...item,
          }
        })
        setOrders(newData)
      } else {
        setOrders(null)
      }
    })
	}

  // function deleteOrder(id) {
	// 	deleteOrder(users.uid, id)
  //   .then((res) => {
  //     res && getOrders()
  //   })
  //   actions.sweetAlert('Ваш заказ отменен')
	// }

  return (  
    <React.Fragment>
      {
        isMobile && (
          <>
            <IsMobile/>
            <div className={cs.goBack}>
              <IconButton onClick={() => navigate(-1)}>
                <span className={cs.icon}><IoMdArrowBack/></span>
              </IconButton>
            </div>
            <div className={cs.profile}>
              <div>
                {
                  users.photo?.length >= 9 || photo?.length >= 9 ?
                    <img src={photo != '' ? photo : users.photo} alt="No photo"/>
                  : (
                    <img src='https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg' alt="" />
                  )
                }
              </div>
              <div>
                <p>{name != '' ? name : users.name}</p>
                <span>{users.email}</span>
              </div>
              <div>
                <Button onClick={() => setToggle(prev => !prev)} variant='outlined' fullWidth>Редактировать профиль <span><GrEdit/></span></Button>
              </div>
              {
                toggle ? <div className={cs.inputs}>
                  <div>
                    <TextField value={name} onChange={e => setName(e.target.value)} fullWidth id="outlined-basic" label="Новое имя" variant="outlined"/>
                  </div>
                  <div className={cs.dFlex}>
                    <TextField value={photo} onChange={e => setPhoto(e.target.value)} fullWidth id="outlined-basic" label="Новое фото" variant="outlined">
                    </TextField>
                    <label htmlFor="file-upload" className={cs.customFileUpload}>
                      <AiFillFolderAdd/>
                    </label>
                    <input id="file-upload" onChange={e => {
                      console.log(e.target.files[0]);
                      setPhoto(e.target.files[0])
                    }} type="file"/>
                  </div>
                  <div>
                    <Button onClick={handleSubmit} variant='outlined' fullWidth>Далее</Button>
                  </div>
                </div> : ''
              }
              <div>
                <Button variant='outlined' onClick={() => setToggleReview(prev => !prev)} fullWidth style={{width: '250px'}}>Мои отзывы</Button>
              </div>
              <div>
                <Button variant='outlined' onClick={() => setToggleOrder(prev => !prev)} fullWidth style={{width: '250px'}}>Мои заказы</Button>
              </div>
            </div>
            <div className={cs.row}>
              {
                toggleReview && review && <h1 style={{textAlign: 'center', marginTop: '1rem', fontWeight: '200'}}>Мои отзывы</h1>
              }
              {
                toggleOrder && orders && <h1 style={{textAlign: 'center', marginTop: '1rem', fontWeight: '200'}}>Мои заказы</h1>
              }
              {
                toggleReview && !review && <h1 className={cs.emptyH1} style={{textAlign: 'center', marginTop: '1rem', fontWeight: '200'}}>Вы ещё не оставляли отзывы</h1>  
              }
              {
                toggleOrder && !orders && <h1 style={{textAlign: 'center', marginTop: '1rem', fontWeight: '200'}}>Вы ещё ничего не заказывали</h1>  
              }
              {
                toggleReview ? <div className={cs.review}>
                  {
                    review?.map(({content, date, grade, name, url, id}) => (
                      <div className={cs.card} key={id}>
                        <div className={cs.card_header}>
                          <img src={url} alt='' />
                          <div className={cs.delete}>
                            <IconButton onClick={() => deleteReview(id)}>
                              <AiFillDelete/>
                            </IconButton>
                          </div>
                        </div>
                        <div className={cs.card_body}>
                          <div className={cs.card_body_header}>
                            <h1 className={cs.title}>{name}</h1>
                            <Button
                              variant="outlined" 
                              className={cs.btnMore}
                              onClick={() => {
                                navigate(`/cards/${id}`)
                              }}
                            >
                              Подробнее
                            </Button>
                          </div>
                          <div className={cs.card_body_footer}>
                            <p className={cs.date}>{date}</p>
                            <Box
                              sx={{
                                '& > legend': { mt: 2 },
                              }}
                            >
                              <Rating
                                readOnly
                                name="read-only"
                                value={grade}
                                className={cs.rating}
                              />
                            </Box>
                            <p>
                              {content.length > 40
                              ? `${content
                                  .split('')
                                  .slice(0, 40)
                                  .join('')}...`
                              : content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div> : ''
              }
              {
                toggleOrder ? <div className={cs.order}>
                  {
                    orders?.map(({url, id, name, price, size}) => (
                      <div className={cs.card} key={id}>
                        <div className={cs.cardImg}>
                          <img 
                            src={url} 
                            className={cs.image} 
                            alt=""
                          />
                        </div>
                        <div className={cs.cardBody}>
                          <div>
                            <p className={cs.price}>{price} cом</p>
                            <p className={cs.cardTitle}>{name}</p>
                          </div>
                          <div className={cs.cardFooter}>
                            <Button 
                              variant="outlined" 
                              className={cs.btnMore} 
                              onClick={() => {
                                navigate(`/cards/${id}`)
                              }}
                            >
                              Подробнее
                            </Button>
                          </div>
                        </div>
                        <div className={cs.sizeBlock}>
                          <p>
                            {size == 'Не выбран' ? '' : `Размер: ${size}`}
                          </p>
                        </div>
                      </div>
                    ))
                  }
                </div> : ''
              }
            </div>
          </>
        )
      }
      {
        isTablet && (
          <>
            <Navbar/>
            <div className={cs.goBack}>
              <IconButton onClick={() => navigate(-1)}>
                <span className={cs.icon}><IoMdArrowBack/></span>
              </IconButton>
            </div>
            <div className={cs.profile}>
              <div>
                {
                  users.photo?.length >= 9 || photo?.length >= 9 ?
                    <img src={photo != '' ? photo : users.photo} alt="No photo"/>
                  : (
                    <img src='https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg' alt="" />
                  )
                }
              </div>
              <div>
                <p>{name != '' ? name : users.name}</p>
                <span>{users.email}</span>
              </div>
              <div>
                <Button onClick={() => setToggle(prev => !prev)} variant='outlined' fullWidth>Редактировать профиль <span><GrEdit/></span></Button>
              </div>
              {
                toggle ? <div className={cs.inputs}>
                  <div>
                    <TextField value={name} onChange={e => setName(e.target.value)} fullWidth id="outlined-basic" label="Новое имя" variant="outlined"/>
                  </div>
                  <div className={cs.dFlex}>
                    <TextField value={photo} onChange={e => setPhoto(e.target.value)} fullWidth id="outlined-basic" label="Новое фото" variant="outlined">
                    </TextField>
                    <label htmlFor="file-upload" className={cs.customFileUpload}>
                      <AiFillFolderAdd/>
                    </label>
                    <input id="file-upload" onChange={e => {
                      console.log(e.target.files[0]);
                      setPhoto(e.target.files[0])
                    }} type="file"/>
                  </div>
                  <div>
                    <Button onClick={handleSubmit} variant='outlined' fullWidth>Далее</Button>
                  </div>
                </div> : ''
              }
              <div>
                <Button variant='outlined' onClick={() => setToggleReview(prev => !prev)} fullWidth style={{width: '250px'}}>Мои отзывы</Button>
              </div>
              <div>
                <Button variant='outlined' onClick={() => setToggleOrder(prev => !prev)} fullWidth style={{width: '250px'}}>Мои заказы</Button>
              </div>
            </div>
            <div className={cs.row}>
              {
                toggleReview && review && <h1 style={{textAlign: 'center', marginTop: '1rem', fontWeight: '200'}}>Мои отзывы</h1>
              }
              {
                toggleOrder && orders && <h1 style={{textAlign: 'center', marginTop: '1rem', fontWeight: '200'}}>Мои заказы</h1>
              }
              {
                toggleReview && !review && <h1 style={{textAlign: 'center', marginTop: '1rem', fontWeight: '200'}}>Вы ещё не оставляли отзывы</h1>  
              }
              {
                toggleOrder && !orders && <h1 style={{textAlign: 'center', marginTop: '1rem', fontWeight: '200'}}>Вы ещё ничего не заказывали</h1>  
              }
              {
                toggleReview ? <div className={cs.review}>
                  {
                    review?.map(({content, date, grade, name, url, id}) => (
                      <div className={cs.card} key={id}>
                        <div className={cs.card_header}>
                          <img src={url} alt='' />
                          <div className={cs.delete}>
                            <IconButton onClick={() => deleteReview(id)}>
                              <AiFillDelete/>
                            </IconButton>
                          </div>
                        </div>
                        <div className={cs.card_body}>
                          <div className={cs.card_body_header}>
                            <h1 className={cs.title}>{name}</h1>
                            <Button
                              variant="outlined" 
                              className={cs.btnMore}
                              onClick={() => {
                                navigate(`/cards/${id}`)
                              }}
                            >
                              Подробнее
                            </Button>
                          </div>
                          <div className={cs.card_body_footer}>
                            <p className={cs.date}>{date}</p>
                            <Box
                              sx={{
                                '& > legend': { mt: 2 },
                              }}
                            >
                              <Rating
                                readOnly
                                name="read-only"
                                value={grade}
                                className={cs.rating}
                              />
                            </Box>
                            <p>
                              {content.length > 40
                              ? `${content
                                  .split('')
                                  .slice(0, 40)
                                  .join('')}...`
                              : content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div> : ''
              }
              {
                toggleOrder ? <div className={cs.order}>
                  {
                    orders?.map(({url, id, name, price, size}) => (
                      <div className={cs.card} key={id}>
                        <div className={cs.cardImg}>
                          <img 
                            src={url} 
                            className={cs.image} 
                            alt=""
                          />
                        </div>
                        <div className={cs.cardBody}>
                          <div>
                            <p className={cs.price}>{price} cом</p>
                            <p className={cs.cardTitle}>{name}</p>
                          </div>
                          <div className={cs.cardFooter}>
                            <Button 
                              variant="outlined" 
                              className={cs.btnMore} 
                              onClick={() => {
                                navigate(`/cards/${id}`)
                              }}
                            >
                              Подробнее
                            </Button>
                          </div>
                        </div>
                        <div className={cs.sizeBlock}>
                          <p>
                            {size == 'Не выбран' ? '' : `Размер: ${size}`}
                          </p>
                        </div>
                      </div>
                    ))
                  }
                </div> : ''
              }
            </div>
          </>
        )  
    }
    </React.Fragment>
  )
}

export default Profile