import fetch from 'isomorphic-fetch';
import { API } from '../config';

// get all conversations of a user
export const getConversations = (token) => {
  return fetch(`${API}/conversations`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

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

export const getMessages = (id, skip, token) => {
  return fetch(`${API}/conversations/${id}/messages?skip=${skip}`, {
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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ message: { content } })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const sendIsTyping = (id, token) => {
  return fetch(`${API}/conversations/${id}/is-typing`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};