import React from 'react';
import { DOMAIN } from '../config';
import { mainXml } from '../actions/general';

const renderUserProfiles = users => {
  let xml = ``;

  users.forEach(user => {
    xml += `<url>
      <loc>${DOMAIN}/profile/${user.username}</loc>
      <priority>0.6</priority>
    </url>`
  });
  
  return xml
}

const sitemapXml = ({ lastMod, users }) => {

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${DOMAIN}</loc>
      <lastmod>${lastMod}</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>${DOMAIN}/blogs/new</loc>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>${DOMAIN}/following</loc>
      <priority>0.85</priority>
    </url>
    <url>
      <loc>${DOMAIN}/user/followers</loc>
      <priority>0.85</priority>
    </url>
    <url>
      <loc>${DOMAIN}/search</loc>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>${DOMAIN}/signin</loc>
      <priority>0.50</priority>
    </url>
    <url>
      <loc>${DOMAIN}/signup</loc>
      <priority>0.50</priority>
    </url>
    ${renderUserProfiles(users)}
  </urlset>
  `
};

export default class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const data = await mainXml();
    console.log(data);
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapXml(data));
    res.end();
  }
}