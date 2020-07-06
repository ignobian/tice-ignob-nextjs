import React from 'react'
import { useContext } from 'react'
import { ConversationContext } from '../../contexts/ConversationContext'
import { DefaultLink } from '../Link';
import Link from 'next/link';

const ChatTop = () => {
  const { convoUser } = useContext(ConversationContext);
  return (
    <div>
      {convoUser ? (
        <div className="p-3 border-bottom d-flex justify-content-between">
          <p className="m-0"><span className="text-muted font-italic">Conversation with </span><span className="font-weight-bold">{convoUser.username}</span></p>
          <Link href='/conversations/list'><DefaultLink>Back</DefaultLink></Link>
        </div>
      ) : <div className="d-flex align-items-center justify-content-center"><img src="/images/loading.svg" width="40" /></div>}
    </div>
  )
}

export default ChatTop
