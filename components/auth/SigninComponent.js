import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';
import { Button } from '../Button';
import { DefaultLink } from '../Link';
import Loading from '../Loading';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';
import LoginFacebook from './LoginFacebook';
import { Row, Col } from 'reactstrap';

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
  const showError = () => error && <div className="alert alert-danger">{error}</div>;
  const showMessage = () => message && <div className="alert alert-info">{message}</div>;

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <input
            type="email"
            onChange={handleChange('email')}
            value={email}
            className="form-control"
            placeholder="Type your email" />
        </div>

        <div className="form-group">
          <input
            type="password"
            onChange={handleChange('password')}
            value={password}
            className="form-control"
            placeholder="Type your password" />
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <Link href="/user/password/forgot"><DefaultLink>Forgot password?</DefaultLink></Link>
          <Button type="submit">Sign in</Button>
        </div>


      </form>
    )
  }
  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      <Row className="mt-5">
        <Col xs="6">
          <LoginGoogle />
        </Col>

        <Col xs="6" className="d-flex justify-content-end">
          <LoginFacebook />
        </Col>
      </Row>
      {showForm && signinForm()}
    </>
  );
}

export default SigninComponent;