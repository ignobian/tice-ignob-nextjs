import { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';
import { forgotPassword, resetPassword } from '../../../../actions/auth';
import Loading from '../../../../components/Loading';
import { SecondaryButton } from '../../../../components/Button';
import { DefaultLink } from '../../../../components/Link';
import Link from 'next/link';

const ResetPassword = ({ router }) => {
  const [values, setValues] = useState({
    newPassword: '',
    passwordConfirmation: '',
    error: '',
    message: '',
    loading: false,
    showForm: true
  });

  const { newPassword, passwordConfirmation, error, message, loading, showForm } = values;

  const handleChange = name => e => {
    setValues({ ...values, error: '', message: '', [name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (newPassword !== passwordConfirmation) {
      setValues({ ...values, error: 'Passwords don\'t match' });
    } else {
      setValues({ ...values, error: '', message: '', loading: true });
  
      const resetPasswordLink = router.query.token;
  
      resetPassword(resetPasswordLink, newPassword).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({ ...values, error: '', message: data.message, showForm: false, loading: false });
        }
      });
    }
  }

  const passwordResetForm = () => (
    <form onSubmit={handleSubmit}>

      <div className="form-group">
        <label htmlFor="password" className="form-label">Enter new password:</label>
        <input 
          id="password"
          type="password"
          onChange={handleChange('newPassword')}
          className="form-control"
          value={newPassword}
          placeholder="password123" />
      </div>

      <div className="form-group">
        <label htmlFor="passwordConfirmation" className="form-label">Reenter password:</label>
        <input 
          id="passwordConfirmation"
          type="password"
          onChange={handleChange('passwordConfirmation')}
          className="form-control"
          value={passwordConfirmation}
          placeholder="password123" />
      </div>

      <div className="form-group">
        <SecondaryButton type="submit">Reset</SecondaryButton>
      </div>
    </form>
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
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-lg-8 offset-md-1 offset-lg-2 my-4">
            <h2>Reset password</h2>
          </div>

          <div className="col-md-10 col-lg-8 offset-md-1 offset-lg-2">
            {showError()}
            {showMessage()}
            {showLoading()}
            {showForm && passwordResetForm()}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withRouter(ResetPassword);