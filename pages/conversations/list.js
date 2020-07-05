import Private from '../../components/auth/Private';
import Layout from '../../components/Layout';
import ConversationsList from '../../components/chat/ConversationsList';

const ConversationList = () => {
  return (
    <Private>
      <Layout>
        <ConversationsList />
      </Layout>
    </Private>
  )
}

export default ConversationList
