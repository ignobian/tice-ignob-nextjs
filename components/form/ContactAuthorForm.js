import { useState } from 'react';
import { SecondaryButton } from '../Button';
import Loading from '../Loading';
import { emailBlogAuthorForm } from '../../actions/form';
import { isAuth } from '../../actions/auth';

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
      emailBlogAuthorForm({
        fromEmail: isAuth().email,
        toEmail: author.email,
        name: isAuth().name,
        message: message
      })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: '', loading: false })
        } else {
          setValues({ ...values, error: '', success: data.success, loading: false, message: '', showForm: false })
        }
      })
    }
  }

  const showError = () => error && <div className="alert alert-danger">{error}</div>
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