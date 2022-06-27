import React from 'react'
import './Dot.scss'

const Dot = ({index, sliderIndex}) => {
  return (
    <div className={sliderIndex == index + 1 ? 'dotItem active' : 'dotItem'}></div>
  )
}

export default Dot