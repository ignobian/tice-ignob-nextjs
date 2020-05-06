import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const wakeUp = () => {
  return fetch(`${API}/wake-up`)
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const listXML = () => {
  return fetch(`${API}/list-for-xml`)
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const indexXml = () => {
  return fetch(`${API}/index-xml`)
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const getXmlForCategory = slug => {
  return fetch(`${API}/get-category-xml/${slug}`)
  .then(res => res.json())
  .catch(err => console.log(err))
}