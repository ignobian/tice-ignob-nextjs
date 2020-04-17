import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const userPublicProfile = (username) => {
  return fetch(`${API}/user/${username}`)
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const getUserForEdit = token => {
  return fetch(`${API}/users/edit`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const getFollowers = token => {
  return fetch(`${API}/users/followers`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}

export const update = (token, user) => {
  return fetch(`${API}/users/update`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: user
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const getUsers = (token) => {
  return fetch(`${API}/users`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const getUsersForXML = () => {
  return fetch(`${API}/users/xml`)
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const toggleFollower = (userId, token) => {
  return fetch(`${API}/user/toggle-follower`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ id: userId })
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const loadUserStats = token => {
  return fetch(`${API}/user/stats`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}