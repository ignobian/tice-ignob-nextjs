import styled from 'styled-components';
import { Button } from '../Button';
import { Form } from 'reactstrap';
import { useState, useContext } from 'react';
import { ConversationContext } from '../../contexts/ConversationContext'
import { getCookie } from '../../actions/auth';
import { sendMessage, sendIsTyping } from '../../actions/conversation';

const TextArea = styled.textarea`
  border: none;
  padding: 5px;
  &:focus {
    outline: none;
  }
`;

const MessageInput = () => {
  const { id, convoUser, typing } = useContext(ConversationContext);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const token = getCookie('token');

  const handleTyping = () => {
    sendIsTyping(id, token);
  }

  const handleChange = e => {
    setError('');
    setContent(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    sendMessage(content, id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setError('');
        setContent('');
      }
    });
  }

  const showTyping = () => convoUser && typing.includes(convoUser.id) ? (
    <span className="text-muted ml-2 font-italic">{convoUser.username} is typing...</span>
  ) : null;

  return (
    <div className="border-top" style={{height: 150}}>
      <Form onSubmit={handleSubmit} style={{height: '100%', display: 'grid', gridTemplateRows: '1fr auto'}}>
        <TextArea value={content} onKeyUp={handleTyping} onChange={handleChange} style={{width: '100%', alignSelf: 'stretch'}} className="border-bottom" placeholder="Type a message..."></TextArea>
        <div className="my-2 d-flex align-items-center">
          <Button type="submit" className="ml-2">Send</Button>
          {showTyping()}
        </div>
      </Form>
    </div>
  )
}

export default MessageInput
