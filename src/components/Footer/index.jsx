import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { FaRegCopyright } from 'react-icons/fa'
import { FiFacebook } from 'react-icons/fi'
import { BsInstagram } from 'react-icons/bs'
import { CgMail } from 'react-icons/cg'
import { BsTelephoneOutbound } from 'react-icons/bs'
import cls from './Footer.module.scss'

const Footer = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 425px)"
  })
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)"
  })
  return (
    <>
      {
        isMobile && (
          <footer className={cls.footerMobile}>
            <h2>Соц сети</h2>
            <div className={cls.icons}>
              <span><FiFacebook/></span>
              <span><BsInstagram/></span>
              <span><CgMail/></span>
              <span><BsTelephoneOutbound/></span>
            </div>
            <div>
              <p>
                <FaRegCopyright/>
                2022
                All Rights Reserved
              </p>
            </div>
          </footer>
        )
      }
      {
        isTablet && (
          <footer>
            <h2>Соц сети</h2>
            <div className={cls.icons}>
              <span><FiFacebook/></span>
              <span><BsInstagram/></span>
              <span><CgMail/></span>
              <span><BsTelephoneOutbound/></span>
            </div>
            <div>
              <p>
                <FaRegCopyright/>
                2022
                All Rights Reserved
              </p>
            </div>
          </footer>
        )
      }
    </>
  )
}

export default Footer