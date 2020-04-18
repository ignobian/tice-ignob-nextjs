import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const getReports = token => {
  return fetch(`${API}/reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}

export const createReport = (data, token) => {
  return fetch(`${API}/reports`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${gtoken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const removeReport = (id, token) => {
  return fetch(`${API}/reports/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}
