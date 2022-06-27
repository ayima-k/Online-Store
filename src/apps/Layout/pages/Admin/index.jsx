import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createCard } from '../../../../api/index'
import cls from './Admin.module.scss'

const Admin = () => {

  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState(0)
  const [category, setCategory] = React.useState('')
  const [basket, setBasket] = React.useState(false)
  const [favorite, setFavorite] = React.useState(false)
  const [url, setUrl] = React.useState('')

  const [loading, setLoading] = React.useState(false)

  const navigate = useNavigate()
  function goBack(){
    navigate('/')
  }

  const handleSubmit = e => {
    e.preventDefault()

    setLoading(true)

    createCard({
      name,
      price,
      url,
      category,
      basket,
      favorite,
    })
    .then(() => navigate('/'))
    .catch(console.error)
    .finally(() => setLoading(false))
  }

  return (
    <div className={cls.root}> 
      <form onSubmit={handleSubmit}>
        <input 
          className={cls.textField}
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
        />
        <input 
          className={cls.textArea}
          type='number'
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Price"
        />
        <input 
          className={cls.textField}
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Url"
        />
        <div>
          <label>Category</label>
          <select onChange={e => setCategory(e.target.value)}>
            <option value='shoes'>Shoes</option>
            <option value='man'>Man</option>
            <option value='woman'>Woman</option>
            <option value='kid'>Kid</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>

      <button 
        className={cls.backBtn}
        onClick={goBack}
        disabled={loading}
      >
        Go back
      </button>
    </div>
  )
}

export default Admin