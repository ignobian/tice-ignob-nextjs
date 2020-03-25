import { useState, useEffect } from 'react';
import { isAuth, preSignup } from '../../actions/auth';
import Router from 'next/router';
import { Button } from '../Button';
import Loading from '../Loading';

const SignupComponent = () => {
  const [ values, setValues ] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const { name, email, password, error, loading, message, showForm } = values;

  // redirect user when already signed in
  useEffect(() => {
    isAuth() && Router.push('/')
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    preSignup(user)
    .then(data => {
      if (data.error) {
        setValues({ ...values, 
          error: data.error,
          loading: false
        });
      } else {
        setValues({...values,
          name: '',
          email: '',
          password: '',
          error: '',
          loading: false,
          message: data.message,
          showForm: false
        });
      }
    });
  }
  
  const handleChange = name => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  }

  const showLoading = () => loading && <Loading/>;
  const showError = () => error && <div className="alert alert-danger">{error}</div>;
  const showMessage = () => message && <div className="text-muted">{message}</div>;

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <input
            type="text"
            onChange={handleChange('name')}
            value={name}
            className="form-control"
            placeholder="Type your name" />
        </div>

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
          <Button type="submit">Sign up</Button>
        </div>

      </form>
    )
  }
  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </>
  );
}

export default SignupComponent;