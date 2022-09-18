import { IconButton } from '@mui/material'
import React from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'
import { getCards } from '../../../../api'
import Navbar from '../../../../components/Header/Navbar/Navbar'
import Loader from '../../../../components/Loader'
import CardTemplate from '../../../../components/Main/Card/CardTemplate'
import cls from './Category.module.scss'

const Category = () => {
  const { category } = useParams()
  const navigate = useNavigate()
  const [data, setData] = React.useState(null)

  console.log(category);

  const get = () => {
		getCards()
    .then((r) => {
			if (r) {
				const newData = Object.entries(r).map(([id, rest]) => {
          return {
            id,
            ...rest,
          }
        })
        .filter((product) => product.category === category)
				setData(newData)
			}
		})
	}

  React.useEffect(() => {
    get()
  }, [get])

  console.log(data)

	if (!data)
		return (
			<div className={cls.loading}>
				<Loader />
			</div>
		)
	if (data?.length === 0) return <h1>Пусто</h1>

  return (
    <React.Fragment>
      <Navbar/>
      <div className={cls.dflex}>
        <div className={cls.goBack}>
          <IconButton onClick={() => navigate(-2)}>
            <span className={cls.icon}><IoMdArrowBack/></span>
          </IconButton>
        </div>
        <h1 className='titleCategory'>{category == 'woman' ? 'женщинам' : category == 'man' ? 'мужчинам' : category == 'kid' ? 'детям' : 'обувь'}</h1>
      </div>
      <div className={cls.container}>
        <div className={cls.row}>
          {data?.map(({name, price, category, basket, favorite, url, id, size}) => (
            <CardTemplate key={id} name={name} price={price} category={category} basket={basket} favorite={favorite} url={url} id={id} size={size}/>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Category