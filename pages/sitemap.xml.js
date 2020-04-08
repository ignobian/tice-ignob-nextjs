import React from 'react';
import { DOMAIN } from '../config';
import { list } from '../actions/blog';
import { getCategories } from '../actions/category';
import { getTags } from '../actions/tag';
import { getUsersForXML } from '../actions/user';

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

const sitemapXml = ({ blogs, categories, tags, users }) => {
  const { postsXml, latestPost } = generateBlogsXml(blogs);
  const categoriesXml = generateXml(categories, 'categories', 0.6);
  const tagsXml = generateXml(tags, 'tags', 0.5);
  const usersXml = generateXml(users, 'profile', 0.4, 'uniqueUsername');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${DOMAIN}/</loc>
      <lastmod>${latestPost}</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>${DOMAIN}/blogs</loc>
      <priority>0.90</priority>
    </url>
    <url>
      <loc>${DOMAIN}/blogs/new</loc>
      <priority>0.90</priority>
    </url>
    <url>
      <loc>${DOMAIN}/following</loc>
      <priority>0.85</priority>
    </url>
    <url>
      <loc>${DOMAIN}/user/followers</loc>
      <priority>0.80</priority>
    </url>
    ${postsXml}
    ${categoriesXml}
    ${tagsXml}
    ${usersXml}
  </urlset>`;
};

export default class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const blogs = await list();
    const categories = await getCategories();
    const tags = await getTags();
    const users = await getUsersForXML();
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapXml({ blogs, categories, tags, users }));
    res.end();
  }
}