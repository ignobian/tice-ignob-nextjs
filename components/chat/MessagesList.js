import { useContext } from 'react';
import { ConversationContext } from '../../contexts/ConversationContext';
import Message from './Message';

const MessagesList = () => {
  const { messages } = useContext(ConversationContext);
  return (
    <div className="py-2">
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessagesList
