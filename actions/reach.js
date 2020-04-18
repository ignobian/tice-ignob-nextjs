import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const addImpression = (blogId, token) => {
  let route = '/impressions/add-not-signed-in';
  if (token) {
    route = '/impressions';
  }
  return fetch(`${API}${route}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ blog_id: blogId })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};
