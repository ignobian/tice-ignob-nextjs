import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createCategory = (category, token) => {
  return fetch(`${API}/categories`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
  .then(res => () => res.json())
  .catch(err => console.log(err));
};

export const getCategories = () => {
  return fetch(`${API}/categories`)
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const getCategory = slug => {
  return fetch(`${API}/categories/${slug}`)
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const removeCategory = (slug, token) => {
  return fetch(`${API}/categories/${slug}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => () => res.json())
  .catch(err => console.log(err));
};