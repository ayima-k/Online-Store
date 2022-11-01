import React from "react";
import { SliderList } from "../../../components/utils/utils"; 
import { Btn } from "./Button";
import { useNavigate } from "react-router-dom";
import Dot from "./Dot";
import './Slider.scss'

export const Slider = () => {
    const navigate = useNavigate()

    
    const [sliderIndex , setSliderIndex] = React.useState(1)
    
    const getCategory = () => {
      return SliderList.map(({category, id}) => sliderIndex == id ? navigate(`cards/category/${category}`) : '')
    }
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
            SliderList.map((img , index) => <img onClick={() => getCategory()} src={img.url} alt='none' key={img.id} className={sliderIndex === index + 1 ?'image active' : 'image' }/>)
          }
          <Btn direction='prev' handleSlide={prevSlide}/>
          <Btn direction='next' handleSlide={nextSlide}/>
        </div>
        <div className='centerDot'>
          {
            Array.from({length:4}).map((dot , index) => <Dot key={index} index={index} sliderIndex={sliderIndex}/>)
          }
        </div>
      </>
  )
}