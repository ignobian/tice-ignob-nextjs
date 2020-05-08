import { useState, useEffect } from 'react';
import { getCookie, isAuth, forgotPassword } from '../../actions/auth';
import { getUserForEdit, update } from '../../actions/user';
import { SecondaryButtonLabel, Button, SecondaryButton, DeleteButton } from '../Button';
import Loading from '../Loading';
import { Form, FormGroup, InputGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Error from '../Error';
import Message from '../Message';
import { Image, Transformation } from 'cloudinary-react';
import DeleteProfileModal from './DeleteProfileModal';
import { setInStorage } from '../../helpers/storage';

const ProfileUpdate = () => {
  const [resetPasswordMessage, setResetPasswordMessage] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDeleteModal, setDeleteModal] = useState(false);
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
    setLoading(true);

    getUserForEdit(token).then(data => {
      if (data.error) {
        setLoading(false);
        setError(data.error);
      } else {
        setLoading(false);
        setValues({ ...values, ...data });
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

    const data = await update(token, userData);
    
    setLoading(false);

    if (data.error) {
      setError(data.error);
      return;
    }

    // update local storage with new user data
    setInStorage('user', data.user);

    setSuccess('User updated');
  }

  const handleResetPassword = async e => {
    const data = await forgotPassword(isAuth().email);
    if (data.error) return setError(data.error);

    setResetPasswordMessage(data.message);
  }

  const onDeleteProfile = () => setDeleteModal(true);

  const closeDeleteProfileModal = () => setDeleteModal(false);

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
    <>
    {showLoading()}
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

            <SecondaryButton className="mt-5" onClick={handleResetPassword}>Reset password</SecondaryButton>

            <div className="my-5">
              <DeleteButton onClick={onDeleteProfile}>Delete profile</DeleteButton>
              <DeleteProfileModal isOpen={isDeleteModal} toggle={closeDeleteProfileModal} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProfileUpdate;