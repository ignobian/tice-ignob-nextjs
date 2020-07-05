import Private from '../../components/auth/Private';
import Layout from '../../components/Layout';
import ChatTop from '../../components/chat/ChatTop';
import MessagesList from '../../components/chat/MessagesList';
import MessageInput from '../../components/chat/MessageInput';
import { ConversationContextProvider } from '../../contexts/ConversationContext';
import { withRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import { APP_NAME } from '../../config';

const Conversation = ({ router }) => {
  const head = () => (
    <Head>
      <title>My Conversations - {APP_NAME}</title>
    </Head>
  )

  const resizeChatContainer = () => {
    document.querySelector('#chat-container').style.height = `${window.innerHeight - 70}px`;
  }

  useEffect(() => {
    // set height of div and every time again on resize
    resizeChatContainer();
    window.addEventListener('resize', resizeChatContainer);

    return () => {
      window.removeEventListener('resize', resizeChatContainer);
    }
  }, []);

  return (
    <>
     {head()}
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
    </>
  )
}

export default withRouter(Conversation);
