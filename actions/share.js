import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const addShare = (type, blogId, token) => {
  let route = '/shares/not-signed-in';
  if (token) {
    route = '/shares';
  }
  return fetch(`${API}${route}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ share_type: type, blog_id: blogId })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};
