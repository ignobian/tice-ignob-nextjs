const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  publicRuntimeConfig: {
    APP_NAME: 'GRAVINASH',
    API_DEVELOPMENT: 'http://localhost:8000/api',
    PRODUCTION: process.env.NODE_ENV === 'production',
    DOMAIN_DEVELOPMENT: 'http://localhost:3000',
    DOMAIN_PRODUCTION: 'https://seoblog.com',
    FB_APP_ID: '',
    DISQUS_SHORTNAME: 'gravinash-blog'
  }
});