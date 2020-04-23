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
