import { useState } from 'react';
import { SecondaryButton } from '../Button';
import Loading from '../Loading';
import Error from '../Error';
import { emailBlogAuthorForm } from '../../actions/form';
import { isAuth, getCookie } from '../../actions/auth';
import Router from 'next/router';
import { Form, FormGroup, Input } from 'reactstrap';

const ContactAuthorForm = ({ author }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setMessage(e.target.value);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!isAuth()) {
      setError('You have to be signed in to use the contact form');
      return Router.push('/signin');
    }
    setLoading(true);

    const token = getCookie('token');

    const email = {
      author_id: author.id,
      message
    }

    const data = await emailBlogAuthorForm(email, token);

    setLoading(false);

    if (data.error) {
      setError(data.error);
      if (data.error === 'Not authorized to perform this action') {
        Router.push('/signin');
      }
      return;
    }

    setSuccess(data.message);
  }

  const showError = () => error && <Error content={error} />
  const showSuccess = () => success && <div className="text-muted">{success}</div>
  const showLoading = () => loading && <Loading/>

  return (
    <Form onSubmit={handleSubmit}>
      {showError()}
      {showSuccess()}
      {showLoading()}
      {!success && (
        <>
          <FormGroup>
            <Input type="textarea" value={message} onChange={handleChange} placeholder="Enter message"/>
          </FormGroup>
          <FormGroup>
            <SecondaryButton type="submit">Send</SecondaryButton>
          </FormGroup>
        </>
      )}
    </Form>
  )
}

export default ContactAuthorForm;