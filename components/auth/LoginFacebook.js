import { useState } from 'react';
import Router from 'next/router';
import FacebookLogin from 'react-facebook-login';
import { loginWithFacebook, authenticate } from '../../actions/auth';
import { FB_APP_ID } from '../../config';
import Loading from '../Loading';

const LoginFacebook = () => {
  const [values, setValues] = useState({
    loading: false
  });

  const { loading } = values;

  const responseFacebook = response => {
    const accessToken = response.accessToken;
    const user = { accessToken };

    setValues({ ...values, loading: true });

    loginWithFacebook(user).then(data => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, loading: false });
        console.log(data.error);
      } else {
        // authenticate the user
        authenticate(data, () => {
          Router.push('/');
        });
      }
    });
  }

  const showLoading = () => loading && <Loading/>

  return (
    <>
      {showLoading()}
      <div className="pb-3">
        <FacebookLogin
          appId={FB_APP_ID}
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="facebook-login-btn" />
      </div>
    </>
  )
}

export default LoginFacebook
