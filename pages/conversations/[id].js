import Private from '../../components/auth/Private';
import Layout from '../../components/Layout';
import ChatTop from '../../components/chat/ChatTop';
import MessagesList from '../../components/chat/MessagesList';
import MessageInput from '../../components/chat/MessageInput';
import { ConversationContextProvider } from '../../contexts/ConversationContext';
import { API } from '../../config';
import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Conversation = ({ router }) => {
  const resizeChatContainer = () => {
    if (document.querySelector('#chat-container')) {
      document.querySelector('#chat-container').style.height = `${window.innerHeight - 70}px`;
    }
  }

  useEffect(() => {
    // set height of div and every time again on resize

    resizeChatContainer();
    window.addEventListener('resize', resizeChatContainer);

    return () => {
      window.removeEventListener('resize', resizeChatContainer);
    }

  }, []);

  useEffect(() => {
    if (router.query.id) {
      const actioncable = require('actioncable');

      const cable = actioncable.createConsumer('ws://localhost:3001/cable');
  
      cable.subscriptions.create({
        channel: 'ConversationChannel',
        id: router.query.id
      }, {
        received: data => {
          console.log(data);
        }
      });
    }
  }, [router.query.id]);

  return (
    <Private>
      <Layout>
        <ConversationContextProvider id={router.query.id}>
            <div id="chat-container" style={{display: 'grid', gridTemplateRows: 'auto 1fr auto'}}>
              <ChatTop />
              <MessagesList />
              <MessageInput />
            </div>
        </ConversationContextProvider>
      </Layout>
    </Private>
  )
}

export default withRouter(Conversation);
