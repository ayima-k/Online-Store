import React from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import cls from './Admin.module.scss'

const Admin = () => {
  const navigate = useNavigate()

  return (
    <Box>
      <Button className={cls.button} variant='oulined' onClick={() => navigate('/admin/create')}>Добавить продукт</Button>
      <Button className={cls.button} variant='oulined' onClick={() => navigate('/admin/orders')}>Посмотреть на заказы</Button>
    </Box>
  )
}

export default Admin