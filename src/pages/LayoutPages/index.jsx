import React from 'react'
import { Routes, Route , useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/useAuth';
import * as LayoutPages from '../../apps/Layout/pages/'

const LayoutRoutes = () => {
  const { users } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    users && navigate('/') 
  }, [users])

  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<LayoutPages.Main/>}/>
        <Route path='/basket' element={<LayoutPages.Basket/>}/>
        <Route path='/favorites' element={<LayoutPages.Favorites/>}/>
        <Route path='/admin' element={<LayoutPages.Admin.Main/>}/>
        <Route path='/admin/create' element={<LayoutPages.Admin.Create/>}/>
        <Route path='/admin/orders' element={<LayoutPages.Admin.Orders/>}/>
        <Route path='/cards/:id' element={<LayoutPages.CardMore/>}/>
        <Route path='/cards/category/:category' element={<LayoutPages.Category/>}/>
        <Route path='/profile/:uid' element={<LayoutPages.Profile/>}/>
      </Routes>
    </React.Fragment>
  )
}

export default LayoutRoutes