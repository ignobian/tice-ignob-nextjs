import { useEffect, useState } from 'react';
import Convo from './Convo';
import { getConversations } from '../../actions/conversation';
import { getCookie } from '../../actions/auth';
import { Container, Row, Col } from 'reactstrap';

const ConversationsList = () => {
  const [convos, setConvos] = useState([]);

  const token = getCookie('token');

  useEffect(() => {
    getConversations(token).then(data => {
      setConvos(data);
    });
  }, []);
  return (
    <div>
      <Container className="border-bottom">
        <Row>
          <Col xs="12">
            <h3 className="py-3">My conversations</h3>

          </Col>
        </Row>
      </Container>

      {convos.map(convo => (
        <Convo convo={convo} />
      ))}
    </div>
  )
}

export default ConversationsList
