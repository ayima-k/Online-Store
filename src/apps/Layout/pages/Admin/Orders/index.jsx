import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getOrder, removeOrder } from '../../../../../api'
import cls from './Orders.module.scss'
import useAlert from '../../../../../components/useAlerts'

const Orders = () => {
  const [orders, setOrders] = React.useState(null)
  const navigate = useNavigate()
  const { actions } = useAlert()

  function getOrders() {
    getOrder()
    .then(r => {
      if (r) {
        const newData = Object.entries(r).map(([id, item]) => {
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

  React.useEffect(() => {
    getOrders()
  }, [setOrders])

  const handleDelete = (id) => {
    removeOrder(id)
    .then(() => {
      getOrders()
    })
    actions.sweetAlert('Вы успешно отклонили заказ')
  }

  const handleAdd = () => {
    actions.sweetAlert('')
  }

  return (
    <div className={cls.row}>
      {
        !orders && (
          <h1 style={{textAlign: 'center', fontWeight: '300', marginTop: '3rem'}}>Заказов нет</h1>
        )
      }
      <div className={cls.orders}>
        {
          orders?.map(({item, users}) => {
            
            return <div className={cls.card} key={item?.id}>
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
              <div className={cls.sizeBlock}>
                <p>
                  {item?.size == 'Не выбран' ? '' : `Размер: ${item?.size}`}
                </p>
              </div>
              <div className={cls.block}>
                <div>
                  <img src={users.photo} alt="" />
                  <p>Имя заказчика: {users.name}</p>
                </div>
                <p>email: {users.email}</p>
              </div>
              <div>
                <Button onClick={() => handleDelete(item?.id)} variant='outlined' className={cls.button} color='error'>Отклонить</Button>
                <Button onClick={() => handleAdd()} variant='contained' className={cls.button} color='success'>Принять</Button>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Orders