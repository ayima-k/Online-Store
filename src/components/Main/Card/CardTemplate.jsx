import React from 'react'
import {BsHeart} from 'react-icons/bs'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { Link } from "react-router-dom";
import cls from './Card.module.scss'
import {AiFillHeart} from 'react-icons/ai'
import {FaShoppingCart} from 'react-icons/fa'

const CardTemplate = ({name, price, category, basket, favorite, url, id}) => {
  return (
    <div className={cls.card} key={id}>
      <div className={cls.cardImg}>
        <img 
          src={url} 
          className={cls.image} 
          alt=""
        />
      </div>
      <div className={cls.cardBody}>
        <div>
          <p className={cls.cardTitle}>{name}</p>
          <p className={cls.price}>{price} cом</p>
        </div>
        
        <div className={cls.more}>
          {/* <div className={cls.url}>
            <Link to={`cards/${id}`} className={cls.btnMore}>Подробнее </Link>
          </div> */}
        </div>
        <ul className={cls.iconList}>
          <li>{favorite ? <AiFillHeart/> : <BsHeart/>}</li>
          <li>{basket ? <FaShoppingCart/> : <AiOutlineShoppingCart/>}</li>
        </ul>
      </div>
    </div>
  )
}

export default CardTemplate