import React from 'react'
import './Slider.scss'

const Dot = ({index, sliderIndex}) => {
  return (
    <div className={sliderIndex == index + 1 ? 'dotItem active' : 'dotItem'}></div>
  )
}

export default Dot