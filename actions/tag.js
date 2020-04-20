import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const getFeaturedTags = () => {
  return fetch(`${API}/tags/featured`, {
    headers: {
      Accept: 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const createTag = (tag, token) => {
  return fetch(`${API}/tag`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(tag)
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const getTags = () => {
  return fetch(`${API}/tags`)
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const getTag = slug => {
  return fetch(`${API}/tags/${slug}`)
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const removeTag = (slug, token) => {
  return fetch(`${API}/tag/${slug}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};