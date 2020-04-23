import { useState } from 'react';
import { SecondaryButton } from '../Button';
import Loading from '../Loading';
import Error from '../Error';
import { emailBlogAuthorForm } from '../../actions/form';
import { isAuth, getCookie } from '../../actions/auth';
import Router from 'next/router';

const ContactAuthorForm = ({ author }) => {
  const [values, setValues] = useState({
    error: '',
    success: '',
    loading: false,
    message: '',
    showForm: true
  });

  const { error, success, message, loading, showForm } = values;

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, success: '', error: '', loading: true })
    if (!isAuth()) {
      setValues({ ...values, error: 'You have to be signed in to use the contact form', success: '', loading: false });
    } else {
      const token = getCookie('token');

      const data = {
        author_id: author.id,
        message
      }

      emailBlogAuthorForm(data, token).then(data => {
        if (data.error) {
          // check if the error is because of unauthorized
          if (data.error === 'Not authorized to perform this action') {
            // redirect to signin
            Router.push('/signin');
          } else {
            setValues({ ...values, error: data.error, success: '', loading: false })
          }
        } else {
          setValues({ ...values, error: '', success: data.success, loading: false, message: '', showForm: false })
        }
      });
    }
  }

  const showError = () => error && <Error content={error} />
  const showSuccess = () => success && <div className="text-muted">{success}</div>
  const showLoading = () => loading && <Loading/>

  return (
    <form onSubmit={handleSubmit}>
      {showError()}
      {showSuccess()}
      {showLoading()}
      {showForm && (
        <>
          <div className="form-group">
            <textarea value={message} onChange={handleChange('message')} type="text" placeholder="Enter message" className="form-control"/>
          </div>
          <div className="form-group">
            <SecondaryButton type="submit">Send</SecondaryButton>
          </div>
        </>
      )}
    </form>
  )
}

export default ContactAuthorForm;