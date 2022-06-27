import React from "react";
import cls from './Button.module.scss'
import {BiRightArrow , BiLeftArrow} from 'react-icons/bi'
export const Btn = ({direction , handleSlide}) => {
  return (
    <>
      {
        direction === 'prev' ? 
        <button className= {cls.prev} onClick={handleSlide}><BiLeftArrow/></button> : 
        <button className={cls.next} onClick={handleSlide}><BiRightArrow/></button>
      }
    </>
  )
}