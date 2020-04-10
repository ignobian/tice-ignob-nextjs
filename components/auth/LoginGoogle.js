import { useState } from 'react';
import Router from 'next/router';
import GoogleLogin from 'react-google-login';
import { loginWithGoogle, authenticate, isAuth } from '../../actions/auth';
import { GOOGLE_CLIENT_ID } from '../../config';
import Loading from '../Loading';

const LoginGoogle = () => {
  const [values, setValues] = useState({
    loading: false
  });

  const { loading } = values;

  const logError = err => {
    console.log(err);
  }

  const responseGoogle = response => {
    const tokenId = response.tokenId;
    const user = { tokenId };
    console.log('belh')

    setValues({ ...values, loading: true });

    loginWithGoogle(user).then(data => {
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
        <GoogleLogin
          autoLoad={false}
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
