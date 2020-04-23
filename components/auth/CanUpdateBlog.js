import { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/auth';
import { getBlog } from '../../actions/blog';

const CanUpdateBlog = ({ slug, children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push('/signin');
    }
    // check if the user has created this blog or is admin
    let isAuthorized;
    // get the blog
    if (slug) {
      getBlog(slug).then(data => {
        if (data.error) {
          return console.log(data.error)
        } else {
          isAuthorized = data.user.id === isAuth().id;
        }
  
        if (!isAuthorized || isAuth() !== 'admin') {
          Router.push('/');
        }
      });
    }
    
  }, []);

  return <>{children}</>
}

export default CanUpdateBlog;