import React from 'react'
import { useContext } from 'react'
import { ConversationContext } from '../../contexts/ConversationContext'

const ChatTop = () => {
  const { id } = useContext(ConversationContext);
  return (
    <p>{id}</p>
  )
}

export default ChatTop
