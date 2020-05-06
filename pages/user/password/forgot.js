import { useState } from 'react';
import Layout from '../../../components/Layout';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import { forgotPassword } from '../../../actions/auth';
import { SecondaryButton } from '../../../components/Button';
import Head from 'next/head';
import { APP_NAME } from '../../../config';
import { Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

const ForgotPassword = () => {
  const head = () => (
    <Head>
      <title>Forgot password - {APP_NAME}</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
  )
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = e => {
    setEmail(e.target.value);
  }

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);
    setError('');

    const data = await forgotPassword(email);

    setLoading(false);

    if (data.error) return setError(data.error);

    setMessage(data.message);
  }

  const showError = () => error && <Error content={error} />
  const showMessage = () => message && <div className="text-muted">{message}</div>
  const showLoading = () => loading && <Loading/>

  const passwordForgotForm = () => (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="email">Enter email:</Label>
        <Input 
          id="email"
          type="email"
          onChange={handleChange}
          value={email}
          placeholder="example@example.com" />
      </FormGroup>

      <FormGroup>
        <SecondaryButton type="submit">Send password reset link</SecondaryButton>
      </FormGroup>
    </Form>
  );

  return (
    <>
      {head()}
      <Layout>
        <Container>
          <Row>

            <Col xs="12" md={{size: 10, offset: 1}} lg={{size: 8, offset: 2}} className="my-4">
              <h2 className="mb-3">Forgot password</h2>

              {showError()}
              {showMessage()}
              {showLoading()}

              {!message && passwordForgotForm()}
            </Col>

          </Row>
        </Container>

      </Layout>
    </>
  )
}

export default ForgotPassword;