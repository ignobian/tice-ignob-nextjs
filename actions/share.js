import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const addShare = (type, blogId, postedById, token) => {
  let route = '/share-not-signed-in';
  if (token) {
    route = '/share';
  }
  return fetch(`${API}${route}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ type, blogId, postedById })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};
