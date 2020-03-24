import { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/auth';

const PrivateOrAdmin = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push('/signin');
    }
  }, []);

  return <>{children}</>
}

export default PrivateOrAdmin;