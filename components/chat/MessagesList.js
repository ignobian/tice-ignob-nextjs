import { useContext } from 'react';
import { ConversationContext } from '../../contexts/ConversationContext';
import Message from './Message';
import { useEffect } from 'react';

const MessagesList = () => {
  const { id, messages, fetchMessages, loading } = useContext(ConversationContext);

  useEffect(() => {
    // add listener that when message box scrolls to top, we fetch older messages
    if (id) {
      document.querySelector('#messages-container').addEventListener('scroll', e => {
        if (e.target.scrollTop == 0) {
          fetchMessages();
        }
      });
    }
  }, [id]);

  const showLoading = () => (
    <div className="d-flex justify-content-center">
      <img width="40" src="/images/loading.svg" alt="Loading..."/>
    </div>
  )

  return (
    <div className="py-2" id="messages-container" style={{overflow: 'scroll'}}>
      {loading && showLoading()}
      {messages.map((message, i) => (
        <Message lastMessage={i === messages.length - 1} key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessagesList
