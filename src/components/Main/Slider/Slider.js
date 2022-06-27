import React from "react";
import { SliderList } from "../../../utils/utils"; 
import './Slider.scss'
import { Btn } from "./Button";
import Dot from "./Dot";

export const Slider = () => {

    const [sliderIndex , setSliderIndex] = React.useState(1)

    const prevSlide = () => {
      if(sliderIndex !== 1){
        setSliderIndex(sliderIndex - 1)
      }else if(sliderIndex === 1){
        setSliderIndex(SliderList.length)
      }
    }

    const nextSlide = () => {
      if(sliderIndex !== SliderList.length){
        setSliderIndex(sliderIndex + 1)
      }else if(sliderIndex === SliderList.length){
        setSliderIndex(1)
      }
    }
    return (
      <>
        <div className='sliderParent'>
          {
            SliderList.map((img , index) => <img src={img.url} alt='none' key={img.id} className={sliderIndex === index + 1 ?'image active' : 'image' }/>)
          }
          <Btn direction='prev' handleSlide={prevSlide}/>
          <Btn direction='next' handleSlide={nextSlide}/>
        </div>
        <div className='centerDot'>
          {
            Array.from({length:5}).map((dot , index) => <Dot key={index} index={index} sliderIndex={sliderIndex}/>)
          }
        </div>
      </>
  )
}