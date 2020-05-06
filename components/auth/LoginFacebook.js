import { useState } from 'react';
import Router from 'next/router';
import FacebookLogin from 'react-facebook-login';
import { loginWithFacebook, authenticate } from '../../actions/auth';
import { FB_APP_ID } from '../../config';
import Loading from '../Loading';

const LoginFacebook = () => {
  const [loading, setLoading] = useState(false);

  const responseFacebook = async response => {
    const accessToken = response.accessToken;
    const user = { access_token: accessToken };

    setLoading(true);

    const data = await loginWithFacebook(user);

    if (data.error) return console.log(data.error);

    authenticate(data, () => {
      Router.push('/');
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
