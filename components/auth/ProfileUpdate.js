import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getUserForEdit, update } from '../../actions/user';
import { API } from '../../config';
import { SecondaryButtonLabel, Button } from '../Button';
import Loading from '../Loading';
import { Form, FormGroup, InputGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Error from '../Error';
import Message from '../Message';
import { Image, Transformation } from 'cloudinary-react';

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
    photoPreview: '',
    cloudinaryPhoto: '',
  });

  const token = getCookie('token');
  const { username, firstName, lastName, email, about, error, success, loading, photo, photoPreview, cloudinaryPhoto } = values;

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
    userData.set('first_name', firstName);
    userData.set('last_name', lastName);
    userData.set('email', email);
    userData.set('about', about);
    if (photo) {
      userData.set('photo', photoPreview);
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

  const showCloudinaryProfilePhoto = () => (
    <Image width="200" style={{borderRadius: '50%'}} publicId={cloudinaryPhoto.key} >
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
          {cloudinaryPhoto && showCloudinaryProfilePhoto()}
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