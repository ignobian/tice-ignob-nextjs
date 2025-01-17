import { DOMAIN } from "../config";

const loadXmlForBlogs = blogs => {
  let xml = ``;

  blogs.forEach(blog => {
    xml += `<url>
      <loc>${DOMAIN}/${blog.slug}</loc>
      <lastmod>${blog.updatedAt}</lastmod>
      <priority>0.9</priority>
    </url>`
  });

  return xml;
}

export default function XMLforCategories(data) {

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${loadXmlForBlogs(data)}
  </urlset>`;
}