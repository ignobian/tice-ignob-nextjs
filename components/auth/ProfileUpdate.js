import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { API } from '../../config';
import { SecondaryButtonLabel, Button } from '../Button';
import { DisplayMd, DisplaySmallerThanMd } from '../responsive/Display';
import Loading from '../Loading';
import { Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    about: '',
    error: '',
    success: false,
    loading: false,
    photo: '',
    photoPreview: ''
  });

  const token = getCookie('token');
  const { username, firstName, lastName, email, about, error, success, loading, photo, photoPreview } = values;

  const init = () => {
    getProfile(token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        const { username, uniqueUsername, name, email, about } = data;
        setValues({ ...values, username, uniqueUsername, name, email, about })
      }
    });
  }

  // get user information with getProfile
  useEffect(() => {
    init();
  }, []);

  const handleChange = name => e => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    if (name === 'photo') {
      // make an image preview
      const reader = new FileReader();

      reader.onload = (e) => {
        setValues({ ...values, photo: value, photoPreview: e.target.result });
      }
      reader.readAsDataURL(value);
    } else {
      setValues({ ...values, [name]: value, error: false, success: false });
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, loading: true });

    // create user data
    const userData = new FormData();
    userData.set('username', username);
    userData.set('name', name);
    userData.set('email', email);
    userData.set('about', about);
    if (photo) {
      userData.set('photo', photo);
    }

    update(token, userData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false, success: false });
      } else {
        updateUser(data, () => {
          setValues({ ...values , loading: false, error: '', success: 'User successfully updated!' });
        });        
      }
    });
  }

  const showError = () => error && <Error content={error} />
  const showSuccess = () => success && <Message color='success' content={success} />
  const showLoading = () => loading && <Loading/>

  const showProfilePhotoPreview = () => {
    if (photoPreview) {
      return <img width="150" className="p-3" src={photoPreview} alt=""/>
    } else {
      return <img width="150" className="p-3" src={`${API}/user/photo/${username}`} alt=""/>
    }
  }

  const showForm = () => (
    <Form onSubmit={handleSubmit} className="mt-4">

      <SecondaryButtonLabel>
        Upload profile photo
        <Input type="file" onChange={handleChange('photo')} accept="image/*" hidden />
      </SecondaryButtonLabel>

      <FormGroup>
        <Label htmlFor="username" className="text-muted">Username</Label>
        <Input id="username" onChange={handleChange('username')} value={username} />
      </FormGroup>

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
          {showProfilePhotoPreview()}
        </Col>

        <Col xs="12" md="8">
          <h2 className="d-none d-md-block my-4">Update profile</h2>
          {showError()}
          {showSuccess()}
          {showLoading()}
          {showForm()}
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileUpdate;