import { IconButton } from '@mui/material'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import ListDividers from '../../components/List'

const List = ({isToggle, toggle}) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 425px)"
  })
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)"
  })

  return (
    <React.Fragment>
      {
        isMobile && (
          <div className={isToggle ? 'mob-menu active' : 'mob-menu'}>
            <IconButton onClick={toggle} className='close'><span>&times;</span></IconButton>
            <div className='list'>
              <ListDividers/>
            </div>
          </div>
        )
      }
      {
        isTablet && (
          <div className={isToggle ? 'tablet-menu active' : 'tablet-menu'}>
            <IconButton onClick={toggle} className='close'><span>&times;</span></IconButton>
            <div className='list'>
              <ListDividers/>
            </div>
          </div>
        )
      }
    </React.Fragment>
  )
}

export default List