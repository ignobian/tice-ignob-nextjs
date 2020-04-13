import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const addImpression = (blogId, postedById, token) => {
  let route = '/reach-not-signed-in';
  if (token) {
    route = '/reach';
  }
  return fetch(`${API}${route}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ blogId, postedById })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};
