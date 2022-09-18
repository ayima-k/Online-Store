import React from 'react'
import { InputLabel, MenuItem, Select } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { createCard } from '../../../../../api'
import cls from './CreateCards.module.scss'

const Create = () => {  
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState(0)
  const [priceTotal, setPriceTotal] = React.useState(0)
  const [category, setCategory] = React.useState('')
  const [count, setCount] = React.useState(1)
  const [size, setSize] = React.useState('Не выбран')
  const [url, setUrl] = React.useState('')
  const [otherCategory, setOtherCategory] = React.useState('')
  const [description, setDescription] = React.useState('')

  const [loading, setLoading] = React.useState(false)

  const navigate = useNavigate()
  function goBack(){
    navigate(-1)
  }

  const handleSubmit = e => {
    e.preventDefault()

    setLoading(true)

    createCard({
      name,
      price,
      url,
      category,
      count,
      description,
      priceTotal,
      size,
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
          onChange={e => {
            setPrice(e.target.value)
            setPriceTotal(e.target.value)
          }}
          placeholder="Price"
        />
        <textarea 
          className={cls.textAreaReal}
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input 
          className={cls.textField}
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Url"
        />
        <div>
          <Select className={cls.select} onChange={e => {
            setCategory(e.target.value)
            setOtherCategory(e.target.value == 'other' ? e.target.value : '')
          }}>
            <MenuItem selected disabled>Выберите категорию</MenuItem>
            <MenuItem value='shoes'>Shoes</MenuItem>
            <MenuItem value='man'>Man</MenuItem>
            <MenuItem value='woman'>Woman</MenuItem>
            <MenuItem value='kid'>Kid</MenuItem>
            <MenuItem value='other'>Other</MenuItem>
          </Select>
        </div>
        {otherCategory == 'other' ? 
          <input 
            className={cls.textField}
            type="text" 
            placeholder='Category'
            value={category}
            onChange={e => setCategory(e.target.value)}
          /> : ''}
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

export default Create