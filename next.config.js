const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  publicRuntimeConfig: {
    APP_NAME: 'Ignob.com',
    API_DEVELOPMENT: 'http://localhost:8000/api',
    API_PRODUCTION: 'http://ignob-backend.herokuapp.com/api',
    PRODUCTION: process.env.NODE_ENV === 'production',
    DOMAIN_DEVELOPMENT: 'http://localhost:3000',
    DOMAIN_PRODUCTION: 'https://ignob-blog-site.herokuapp.com',
    FB_APP_ID: '',
    DISQUS_SHORTNAME: 'gravinash-blog'
  }
});