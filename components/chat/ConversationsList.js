import { useEffect, useState } from 'react';
import Convo from './Convo';
import { getConversations } from '../../actions/conversation';
import { getCookie } from '../../actions/auth';
import { Container, Row, Col } from 'reactstrap';

const ConversationsList = () => {
  const [convos, setConvos] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = getCookie('token');

  useEffect(() => {
    getConversations(token).then(data => {
      setConvos(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col xs="12" sm="10" md="9">
            <h3 className="py-3">My conversations</h3>
            {loading && (
              <div className="d-flex justify-content-center">
                <img src="/images/loading.svg" width="30" className="mt-3" alt="Loading..."/>
              </div>
            )}

            {convos.map((convo, i) => (
              <Convo isFirst={i === 0} convo={convo} />
            ))}
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default ConversationsList
