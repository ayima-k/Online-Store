import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Navbar from './Navbar/Navbar'
import '../Header/Header.scss'
import IsMobile from './IsMobile'

const Header = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 425px)"
  })
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)"
  })
  return (
    <React.Fragment>
      {
        isMobile && (<IsMobile/>)
      }
      {
        isTablet && (
          <>
            <Navbar/>
          </>
        )
      }
    </React.Fragment>
  )
}

export default Header