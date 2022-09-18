import { Button } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleFromBasket, updateSizeBasket } from '../../../../../api'
import { useAuth } from '../../../../../providers/useAuth'
import cls from '../CardMore.module.scss'

const Size = ({page}) => {
  const [data, setData] = React.useState(null)
  const [size, setSize] = React.useState(data?.size ? data?.size : '')
  const { id } = useParams()
  const { users } = useAuth()

  const getProduct = () => {
    getSingleFromBasket(users?.uid, id)
    .then(res => {
      if (res) {
        setData(() => {
          return {
            ...res,
            id: id
          }
        })
      }
    })
  }

  React.useEffect(() => {
    getProduct()
    updateSizeBasket({size: data?.size == 'Не выбран' ? size != '' ? size : 'Не выбран' : size != data?.size && size != '' ? size : data?.size}, id, users?.uid)
  }, [size])

  const sizeF = (val, size1, size2) => {
    setSize(data?.size == 'Не выбран' || data?.size == '' || size != data?.size || size != size1 || size != size2 ? val : data?.size)
    updateSizeBasket({size: data?.size == 'Не выбран' ? size != '' ? size : 'Не выбран' : size != data?.size && size != '' ? size : data?.size}, id, users?.uid)
  }

  const sizeV = (size1, size2) => {
    updateSizeBasket({size: data?.size == 'Не выбран' ? size != '' ? size : 'Не выбран' : size != data?.size && size != '' ? size : data?.size}, id, users?.uid)
    return data?.size == 'Не выбран' || data?.size == '' || data?.size !== size1 || data?.size !== size2 ? data?.category == 'shoes' ? size1 : size2 : data?.size != size ? size : data?.size 
  }

  const sizeVar = (size1, size2) => {
    return size == size1 || data?.size == size1 || data?.size == size2 || size == size2 ? 'contained' : 'outlined'
  }

  return (
    <React.Fragment>
      <div className={cls.size}>
        <p>Размер</p>
        {data?.page ? (
        <div className={cls.btn}>
          <Button 
            value={sizeV('38', 'S')}
            onClick={(e) => sizeF(e.target.value, 'S', '38')}
            variant={sizeVar('S', '38')}>
            {data?.category == 'shoes' ? '38' : 'S'}
          </Button>
          <Button 
            value={sizeV('39', 'M')} 
            onClick={(e) => sizeF(e.target.value, 'M', '39')}
            variant={sizeVar('M', '39')}
          >
            {data?.category == 'shoes' ? '39' : 'M'}
          </Button>
          <Button 
            value={sizeV('40', 'L')}
            onClick={(e) => sizeF(e.target.value, 'L', '40')}
            variant={sizeVar('L', '40')}
          >
            {data?.category == 'shoes' ? '40' : 'L'}
          </Button>
          <Button 
            value={sizeV('41', 'XL')}
            onClick={(e) => sizeF(e.target.value, 'XL', '41')}
            variant={sizeVar('XL', '41')}
          >
            {data?.category == 'shoes' ? '41' : 'XL'}
          </Button>
        </div>) : <span>Размер можно выбрать только в корзине</span>}
      </div>
    </React.Fragment>
  )
}

export default Size