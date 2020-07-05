import Private from '../../components/auth/Private';
import Layout from '../../components/Layout';
import ChatTop from '../../components/chat/ChatTop';
import { ConversationContextProvider } from '../../contexts/ConversationContext';
import { withRouter } from 'next/router';

const Conversation = ({ router }) => {
  return (
    <Private>
      <ConversationContextProvider id={router.query.id}>
        <Layout>
          <ChatTop />
        </Layout>
      </ConversationContextProvider>
    </Private>
  )
}

export default withRouter(Conversation);
