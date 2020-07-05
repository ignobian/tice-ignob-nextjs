import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const findConversationId = (id, token) => {
  return fetch(`${API}/conversations/find?with=${id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const getConversation = (id, token) => {
  return fetch(`${API}/conversations/${id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const sendMessage = (content, id, token) => {
  return fetch(`${API}/conversations/${id}/messages`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ message: { content } })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};