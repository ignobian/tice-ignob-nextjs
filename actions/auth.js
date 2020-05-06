import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { API } from '../config';
import Router from 'next/router';
import { setInStorage } from '../helpers/storage';

export const handleResponse = response => {
  if (response.status === 401) {
    signout(() => {
      Router.push({
        pathname: '/signin',
        query: {
          message: 'Your session has expired. Please sign in'
        }
      });
    });
  }
}

export const preSignup = (user) => {
  return fetch(`${API}/registrations/pre-signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const signup = token => {
  return fetch(`${API}/registrations`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const signin = (user) => {
  return fetch(`${API}/sessions`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const signout = (next) => {
  removeCookie('token');
  removeLocalStorage('user');
  next();
}

// set cookie
export const setCookie = (key, value) => {
  // check if we are in the client side
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1
    });
  }
}

export const removeCookie = (key) => {
  // check if we are in the client side
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
}

// get cookie
export const getCookie = (key) => {
  // check if we are in the client side
  if (process.browser) {
    return cookie.get(key);
  }
}

// localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
}

// authenticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
  setCookie('token', data.token);
  setInStorage('user', data.user);
  next();
}

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false
      }
    }
  }
}

// update localstorage with new user
export const updateUser = (user, next) => {
  if (process.browser) {
    if (localStorage.getItem('user')) {
      let auth = user;
      localStorage.setItem('user', JSON.stringify(auth));
    }
  }
  next();
}

export const forgotPassword = (email) => {
  return fetch(`${API}/forgot-password`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const resetPassword = (resetPasswordLink, newPassword) => {
  return fetch(`${API}/reset-password`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: resetPasswordLink, new_password: newPassword })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const loginWithGoogle = (user) => {
  return fetch(`${API}/google-login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const loginWithFacebook = (user) => {
  return fetch(`${API}/facebook-login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const deleteProfile = (deleteBlogs, token) => {
  return fetch(`${API}/registrations/delete-profile`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ also_delete_blogs: deleteBlogs })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}