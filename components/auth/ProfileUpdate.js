import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth, updateUser } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { API } from '../../config';
import { SecondaryButtonLabel, Button } from '../Button';
import { DisplayMd, DisplaySmallerThanMd } from '../responsive/Display';
import Loading from '../Loading';

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: '',
    uniqueUsername: '',
    name: '',
    email: '',
    about: '',
    error: false,
    success: false,
    loading: false,
    photo: '',
    photoPreview: ''
  });

  const token = getCookie('token');
  const { username, uniqueUsername, name, email, about, error, success, loading, photo, photoPreview } = values;

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
    userData.set('photo', photo);

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

  const showError = () => error && <div className="alert alert-danger">{error}</div>
  const showSuccess = () => success && <div className="alert alert-success">{success}</div>
  const showLoading = () => loading && <Loading/>

  const showProfilePhotoPreview = () => {
    if (photoPreview) {
      return <img width="150" className="p-3" src={photoPreview} alt=""/>
    } else {
      return <img width="150" className="p-3" src={`${API}/user/photo/${uniqueUsername}`} alt=""/>
    }
  }

  const showForm = () => (
    <form onSubmit={handleSubmit} className="mt-4">

      <SecondaryButtonLabel>
        Upload profile photo
        <input type="file" onChange={handleChange('photo')} accept="image/*" hidden />
      </SecondaryButtonLabel>

      <div className="form-group">
        <label htmlFor="username" className="text-muted">Username</label>
        <input id="username" onChange={handleChange('username')} value={username} type="text" className="form-control" />
      </div>

      <div className="form-group">
        <label htmlFor="name" className="text-muted">Name</label>
        <input id="name" onChange={handleChange('name')} value={name} type="text" className="form-control" />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="text-muted">Email</label>
        <input id="email" onChange={handleChange('email')} value={email} type="email" className="form-control" />
      </div>

      <div className="form-group">
        <label htmlFor="about" className="text-muted">About</label>
        <textarea id="about" value={about} onChange={handleChange('about')} className="form-control"></textarea>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  )

  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-md-4">
          <DisplaySmallerThanMd className="my-4">
            <h2>Update profile</h2>
          </DisplaySmallerThanMd>
          {showProfilePhotoPreview()}
        </div>

        <div className="col-md-8">
          <DisplayMd className="my-4">
            <h2>Update profile</h2>
          </DisplayMd>
          {showError()}
          {showSuccess()}
          {showLoading()}
          {showForm()}
        </div>
      </div>
    </div>
  )
}

export default ProfileUpdate;