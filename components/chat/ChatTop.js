import React from 'react'
import { useContext } from 'react'
import { ConversationContext } from '../../contexts/ConversationContext'

const ChatTop = () => {
  const { convoUser } = useContext(ConversationContext);
  return (
    <div>
      {convoUser ? (
        <div className="p-3 border-bottom">
          <p className="m-0"><span className="text-muted font-italic">Conversation with </span><span className="font-weight-bold">{convoUser.username}</span></p>
          {convoUser.lastSeen && <p className="text-muted mt-2"><small>Last seen {convoUser.lastSeen}</small></p>}
        </div>
      ) : <div className="d-flex align-items-center justify-content-center"><img src="/images/loading.svg" width="40" /></div>}
    </div>
  )
}

export default ChatTop
