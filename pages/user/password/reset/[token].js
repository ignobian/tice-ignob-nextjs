import { useState } from 'react';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';
import { resetPassword } from '../../../../actions/auth';
import Loading from '../../../../components/Loading';
import { SecondaryButton } from '../../../../components/Button';
import { DefaultLink } from '../../../../components/Link';
import Link from 'next/link';
import Head from 'next/head';
import { APP_NAME } from '../../../../config';
import { Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

const ResetPassword = ({ router }) => {
  const head = () => (
    <Head>
      <title>Reset password - {APP_NAME}</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
  )
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    newPassword: '',
    passwordConfirmation: '',
  });

  const { newPassword, passwordConfirmation } = values;

  const handleChange = name => e => {
    setError('');
    setValues({ ...values, [name]: e.target.value });
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if (newPassword !== passwordConfirmation) {
      setError('Passwords don\'t match');
    } else {
      setLoading(true);
  
      const resetPasswordLink = router.query.token;

      const data = await resetPassword(resetPasswordLink, newPassword);

      setLoading(false);

      if (data.error) return setError(data.error);

      setMessage(data.message);
    }
  }

  const passwordResetForm = () => (
    <Form onSubmit={handleSubmit}>

      <FormGroup>
        <Label htmlFor="password">Enter new password:</Label>
        <Input 
          id="password"
          type="password"
          onChange={handleChange('newPassword')}
          value={newPassword}
          placeholder="password123" />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="passwordConfirmation">Re-enter password:</Label>
        <Input 
          id="passwordConfirmation"
          type="password"
          onChange={handleChange('passwordConfirmation')}
          value={passwordConfirmation}
          placeholder="password123" />
      </FormGroup>

      <FormGroup>
        <SecondaryButton type="submit">Reset</SecondaryButton>
      </FormGroup>
    </Form>
  );

  const showError = () => error && <div className="alert alert-danger">{error}</div>
  const showMessage = () => message && (
    <>
      <div className="text-muted">{message}</div>
      <Link href="/signin"><DefaultLink>Sign in</DefaultLink></Link>
    </>

  );
  const showLoading = () => loading && <Loading/>

  return (
    <>
      {head()}
      <Layout>
        <Container>
          <Row>
            <Col xs="12" md={{size: 10, offset: 1}} lg={{size: 8, offset: 2}} className="my-4">
              <h2 className="mb-4">Reset password</h2>

              {showError()}
              {showMessage()}
              {showLoading()}

              {!message && passwordResetForm()}
            </Col>
            
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default withRouter(ResetPassword);