import React from 'react'
import Navbar from './Navbar/Navbar'
import IsMobile from './IsMobile'
import useCards from '../Main/Card/hooks/useCards'
import { useMediaQuery } from 'react-responsive'
import '../Header/Header.scss'

const Header = () => {

  const { cards } = useCards()

  const isMobile = useMediaQuery({
    query: "(max-width: 425px)"
  })
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)"
  })
  return (
    <React.Fragment>
      {
        isMobile && (<IsMobile baseToSearch={cards}/>)
      }
      {
        isTablet && (
          <>
            <Navbar baseToSearch={cards}/>
          </>
        )
      }
    </React.Fragment>
  )
}

export default Header