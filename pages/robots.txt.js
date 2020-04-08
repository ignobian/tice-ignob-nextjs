import React from 'react';
import { DOMAIN } from '../config';

const robotTXT = () => {
  return `Sitemap: ${DOMAIN}/sitemap.xml
User-Agent:*
Disallow: /admin/*`;
}

export default class extends React.Component {
  static getInitialProps({ res }) {
    res.setHeader('content-type', 'text/plain');
    res.write(robotTXT());
    res.end();
  }
}


