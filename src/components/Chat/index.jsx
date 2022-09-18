import { IconButton } from '@mui/material'
import React from 'react'
import { BsChatTextFill } from 'react-icons/bs'
import './Chat.scss'
import ChatWindow from './ChatWindow'

const Chat = () => {
  const [isToggle, setIsToggle] = React.useState(false)
  const toggle = () => setIsToggle(prev => !prev)

  return (
    <React.Fragment>
      <div className='chatIcon' onClick={toggle}>
        <IconButton>
          <span><BsChatTextFill/></span>
        </IconButton>
      </div>
      <ChatWindow isToggle={isToggle} toggle={toggle}/>
    </React.Fragment>
  )
}

export default Chat