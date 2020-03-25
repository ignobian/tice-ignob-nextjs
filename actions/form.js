import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const emailContactForm = data => {
  return fetch(`${API}/contact`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const emailBlogAuthorForm = data => {
  return fetch(`${API}/contact-blog-author`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}