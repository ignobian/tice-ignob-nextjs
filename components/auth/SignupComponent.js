import { useState, useEffect } from 'react';
import { isAuth, preSignup } from '../../actions/auth';
import Router from 'next/router';
import { Button } from '../Button';
import Loading from '../Loading';
import { Form, Input, FormGroup, Row, Col, InputGroup } from 'reactstrap';

const SignupComponent = () => {
  const [ values, setValues ] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const { username, firstName, lastName, email, password, passwordConfirmation, error, loading, message, showForm } = values;

  // redirect user when already signed in
  useEffect(() => {
    isAuth() && Router.push('/')
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // check if password and confirmation are the same
    if (password === passwordConfirmation) {
      setValues({ ...values, loading: true, error: '' });

      const user = {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password
      }

      preSignup(user).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({...values, loading: false, message: data.message, showForm: false });
        }
      });
      
    } else {
      setValues({ ...values, error: 'Passwords don\'t match', password: '', passwordConfirmation: '' });
    }
  }
  
  const handleChange = name => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  }

  const showLoading = () => loading && <Loading/>;
  const showError = () => error && <div className="alert alert-danger">{error}</div>;
  const showMessage = () => message && <div className="text-muted">{message}</div>;

  const signupForm = () => {
    return (
      <Form onSubmit={handleSubmit}>

        <InputGroup className="mb-3">
          <div className="input-group-prepend">
            <div className="input-group-text">@</div>
          </div>
          <Input 
            type="text"
            placeholder="Username"
            onChange={handleChange('username')}
            value={username} />
        </InputGroup>

        <Row form>
          <Col xs="12" md="6">
            <FormGroup>
              <Input
                type="text"
                onChange={handleChange('firstName')}
                value={firstName}
                placeholder="First name" />
            </FormGroup>
          </Col>

          <Col xs="12" md="6">
            <FormGroup>
              <Input
                type="text"
                onChange={handleChange('lastName')}
                value={lastName}
                placeholder="Last name" />
            </FormGroup>
          </Col>
        </Row>



        <FormGroup>
          <Input
            type="email"
            onChange={handleChange('email')}
            value={email}
            placeholder="Email" />
        </FormGroup>

        <FormGroup>
          <Input
            type="password"
            onChange={handleChange('password')}
            value={password}
            placeholder="Password" />
        </FormGroup>

        <FormGroup>
          <Input
            type="password"
            onChange={handleChange('passwordConfirmation')}
            value={passwordConfirmation}
            placeholder="Retype password" />
        </FormGroup>

        <div className="d-flex justify-content-center mt-4">
          <Button type="submit">Sign up</Button>
        </div>

      </Form>
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