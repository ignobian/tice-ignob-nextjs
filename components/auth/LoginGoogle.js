import { useState } from 'react';
import Router from 'next/router';
import GoogleLogin from 'react-google-login';
import { loginWithGoogle, authenticate } from '../../actions/auth';
import { GOOGLE_CLIENT_ID } from '../../config';
import Loading from '../Loading';

const LoginGoogle = () => {
  const [loading, setLoading] = useState(false);

  const logError = err => {
    console.log(err);
  }

  const responseGoogle = async response => {
    const tokenId = response.tokenId;
    const user = { token_id: tokenId };

    setLoading(true);

    const data = await loginWithGoogle(user);

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
        <GoogleLogin
          // autoLoad={false}
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={logError}
          theme="dark"
        />
      </div>
    </>
  )
}

export default LoginGoogle
