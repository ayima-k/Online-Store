import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div className='container' style={{height: '80vh'}}>
      <div className="lds-dual-ring"></div>
    </div>
  )
}

export default Loader