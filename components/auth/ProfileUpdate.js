import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getUserForEdit, update } from '../../actions/user';
import { API } from '../../config';
import { SecondaryButtonLabel, Button, SecondaryButton } from '../Button';
import Loading from '../Loading';
import { Form, FormGroup, InputGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Error from '../Error';
import Message from '../Message';
import { Image, Transformation } from 'cloudinary-react';

const ProfileUpdate = () => {
  const [resetPasswordMessage, setResetPasswordMessage] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [values, setValues] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    about: '',
    photo: '',
    photoPreview: '',
    cloudinaryPhoto: '',
  });

  const token = getCookie('token');
  const { username, firstName, lastName, email, about, photo, photoPreview, cloudinaryPhoto } = values;

  // get user information with getProfile
  useEffect(() => {
    setValues({ ...values, loading: true });

    getUserForEdit(token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({ ...values, ...data })
      }
    });
  }, []);

  const handleChange = name => e => {
    setError('');
    setResetPasswordMessage('');

    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    if (name === 'photo') {
      // make an image preview
      const reader = new FileReader();

      reader.onload = (e) => {
        setValues({ ...values, photo: value, photoPreview: e.target.result, cloudinaryPhoto: '' });
      }
      reader.readAsDataURL(value);
    } else {
      setValues({ ...values, [name]: value });
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    // create user data
    const userData = new FormData();
    userData.set('username', username);
    userData.set('first_name', firstName);
    userData.set('last_name', lastName);
    userData.set('email', email);
    userData.set('about', about);
    if (photo) {
      userData.set('photo', photoPreview);
    }

    window.scrollTo(0,0);

    const data = update(token, userData);
    
    setLoading(false);

    if (data.error) {
      setError(data.error);
      return;
    }

    setError('');
    setSuccess(data.message);
  }

  const handleResetPassword = async () => {
    console.log('hi')
  }

  const showError = () => error && <Error content={error} />
  const showSuccess = () => success && <Message color='success' content={success} />
  const showLoading = () => loading && <Loading/>
  const showResetPasswordMessage = () => resetPasswordMessage && <Message color='success' content={resetPasswordMessage} />

  const showProfilePhotoPreview = () => <img width="150" className="p-2" src={photoPreview} alt=""/>

  const showCloudinaryProfilePhoto = () => (
    <Image width="150" className="p-2" publicId={cloudinaryPhoto.key} >
      <Transformation width="400" crop="fill" />
    </Image>
  )

  const showForm = () => (
    <Form onSubmit={handleSubmit} className="mt-4">

      <SecondaryButtonLabel>
        Upload profile photo
        <Input type="file" onChange={handleChange('photo')} accept="image/*" hidden />
      </SecondaryButtonLabel>

      <InputGroup className="mb-3 mt-2">
        <div className="input-group-prepend">
          <div className="input-group-text">@</div>
        </div>
        <Input 
          type="text"
          placeholder="Username"
          onChange={handleChange('username')}
          value={username} />
      </InputGroup>

      {showResetPasswordMessage()}

      <SecondaryButton className="mt-2 mb-3" onClick={handleResetPassword}>Reset password</SecondaryButton>

      <FormGroup>
        <Label htmlFor="firstName" className="text-muted">First name</Label>
        <Input id="firstName" onChange={handleChange('firstName')} value={firstName} />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="lastName" className="text-muted">Last name</Label>
        <Input id="lastName" onChange={handleChange('lastName')} value={lastName} />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email" className="text-muted">Email</Label>
        <Input id="email" onChange={handleChange('email')} value={email} type="email" />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="about" className="text-muted">About</Label>
        <Input type="textarea" id="about" value={about} onChange={handleChange('about')} />
      </FormGroup>

      <Button type="submit">Update</Button>
    </Form>
  )

  return (
    <Container>
      <Row className="mb-5">
        <Col xs="12" md="4">
          <h2 className="d-block d-md-none my-4">Update profile</h2>
          {showError()}
          {showSuccess()}
          {showProfilePhotoPreview()}
          {cloudinaryPhoto && showCloudinaryProfilePhoto()}
        </Col>

        <Col xs="12" md="8">
          <h2 className="d-none d-md-block my-4">Update profile</h2>
          {showLoading()}
          {showForm()}
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileUpdate;