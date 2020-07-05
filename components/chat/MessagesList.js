import { useContext } from 'react';
import { ConversationContext } from '../../contexts/ConversationContext';
import Message from './Message';

const MessagesList = () => {
  const { messages } = useContext(ConversationContext);
  return (
    <div className="py-2" style={{overflow: 'scroll'}}>
      {messages.map((message, i) => (
        <Message lastMessage={i === messages.length - 1} key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessagesList
