import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router';
import { Button } from '../Button';
import Loading from '../Loading';

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
          if (isAuth() && isAuth().role === 1) {
            Router.push('/admin');
          } else {
            Router.push('/user');
          }
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

        <div className="d-flex justify-content-center mt-4">
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
      {showForm && signinForm()}
    </>
  );
}

export default SigninComponent;