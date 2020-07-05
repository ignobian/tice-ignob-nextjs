import styled from 'styled-components';
import { Button } from '../Button';
import { Form } from 'reactstrap';
import { useState } from 'react';

const TextArea = styled.textarea`
  border: none;
  &:focus {
    outline: none;
  }
`;

const MessageInput = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setError('');
    setContent(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    console.log(content);
  }

  return (
    <div className="border-top" style={{height: 150}}>
      <Form onSubmit={handleSubmit} style={{height: '100%', display: 'grid', gridTemplateRows: '1fr auto'}}>
        <TextArea value={content} onChange={handleChange} style={{width: '100%', alignSelf: 'stretch'}} className="border-bottom" placeholder="Type a message..."></TextArea>
        <div className="my-2 d-flex">
          <Button type="submit" className="ml-2">Send</Button>
        </div>
      </Form>
    </div>
  )
}

export default MessageInput
