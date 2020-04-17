import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';
import { Button } from '../Button';
import { DefaultLink } from '../Link';
import Loading from '../Loading';
import Error from '../Error';
import Message from '../Message';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';
import LoginFacebook from './LoginFacebook';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';

const SigninComponent = () => {
  const [ values, setValues ] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const { email, password, error, loading, message, showForm } = values;

  // redirect user if he is already logged in
  useEffect(() => {
    isAuth() && Router.push('/')
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user)
    .then(data => {
      if (data.error) {
        setValues({ ...values, 
          error: data.error,
          loading: false
        });
      } else {
        // save user token to cookie
        // save user info to localstorage
        // authenticate user
        authenticate(data, () => {
          Router.push('/');
        });
      }
    });
  }
  
  const handleChange = name => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  }

  const showLoading = () => loading && <Loading/>;
  const showError = () => error && <Error content={error} />;
  const showMessage = () => message && <Message color="success" content={message} />;

  const signinForm = () => {
    return (
      <Form onSubmit={handleSubmit}>

        <FormGroup>
          <Input
            type="email"
            onChange={handleChange('email')}
            value={email}
            placeholder="Type your email" />
        </FormGroup>

        <FormGroup>
          <Input
            type="password"
            onChange={handleChange('password')}
            value={password}
            placeholder="Type your password" />
        </FormGroup>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <Link href="/user/password/forgot"><DefaultLink>Forgot password?</DefaultLink></Link>
          <Button type="submit">Sign in</Button>
        </div>


      </Form>
    )
  }
  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      <Row className="mt-5">
        <Col xs="12" md="6">
          <LoginGoogle />
        </Col>

        <Col xs="12" md="6" className="d-md-flex justify-content-end d-block">
          <LoginFacebook />
        </Col>
      </Row>
      {showForm && signinForm()}
    </>
  );
}

export default SigninComponent;