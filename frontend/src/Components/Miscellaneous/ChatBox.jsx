import React, { useContext } from 'react'
import chatContext from '../../Context/chatProvider'
import { Box } from '@mui/material';
import style from "./chatbox.module.scss"
import MessageBox from '../MessageBox/MessageBox';


function  ChatBox() {
  const {selectedChat} = useContext(chatContext);
  return (
    <div className={selectedChat ? style.container1 : style.container}>
     {selectedChat ? <MessageBox /> : <h1>Please select any chat to start messaging</h1>}
    </div>
  )
}

export default ChatBox
