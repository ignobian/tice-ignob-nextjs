import React from 'react';
import { DOMAIN } from '../config';
import { indexXml } from '../actions/general';

const generateBlogsXml = (blogs) => {
  let latestPost = 0;
  let postsXml = "";

  // iterate over each blog post
  blogs.forEach(blog => {
    const postDate = Date.parse(blog.updatedAt);
    if (!latestPost || postDate > latestPost) {
      // set latest modified to postdate updated at
      latestPost = postDate;
    }
    postsXml += `
    <url>
      <loc>${DOMAIN}/${blog.slug}</loc>
      <lastmod>${postDate}</lastmod>
      <priority>0.80</priority>
    </url>`;
  });

  return {
    postsXml,
    latestPost
  };
};

const generateXml = (data, extension, priority, keyForSlug = 'slug') => {
  let xml = '';
  // iterate over data objects
  data.forEach(obj => {
    xml += `
    <url>
      <loc>${DOMAIN}/${extension}/${obj[keyForSlug]}</loc>
      <priority>${priority}</priority>
    </url>
    `;
  });
  return xml
}

const generateCategorySitemapLinks = categories => {
  let xml = ``;

  categories.forEach(cat => {
    xml += `<sitemap>
      <loc>${DOMAIN}/sitemap_${cat.slug}.xml</loc>
      <lastmod>${cat.lastModified}</lastmod>
    </sitemap>`;
  });

  return xml;
}

const sitemapXml = ({ categories, lastMod }) => {

  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

   <sitemap>

      <loc>${DOMAIN}/sitemap_main.xml</loc>

      <lastmod>${lastMod}</lastmod>

   </sitemap>

   ${generateCategorySitemapLinks(categories)}

</sitemapindex>`
};

export default class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const data = await indexXml();
    console.log(data);
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapXml(data));
    res.end();
  }
}