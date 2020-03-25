import { useState } from 'react';
import Layout from '../../../components/Layout';
import Loading from '../../../components/Loading';
import { forgotPassword } from '../../../actions/auth';
import { SecondaryButton } from '../../../components/Button';

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: '',
    message: '',
    error: '',
    loading: false,
    showForm: true
  });

  const { email, message, error, loading, showForm } = values;

  const handleChange = name => e => {
    setValues({ ...values, message: '', error: '', [name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();

    setValues({ ...values, error: '', message: '', loading: true });

    forgotPassword(email).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({ ...values, message: data.message, error: '', loading: false, showForm: false });
      }
    });
  }

  const showError = () => error && <div className="alert alert-danger">{error}</div>
  const showMessage = () => message && <div className="text-muted">{message}</div>
  const showLoading = () => loading && <Loading/>

  const passwordForgotForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Enter email:</label>
        <input 
          id="email"
          type="email"
          onChange={handleChange('email')}
          className="form-control"
          value={email}
          placeholder="example@example.com" />
      </div>

      <div className="form-group">
        <SecondaryButton type="submit">Send password reset link</SecondaryButton>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="container">
        <div className="row">

          <div className="col-md-10 offset-md-1 my-4">
            <h2>Forgot password</h2>
          </div>

          <div className="col-md-10 offset-md-1">
            {showError()}
            {showMessage()}
            {showLoading()}
            {showForm && passwordForgotForm()}
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default ForgotPassword;