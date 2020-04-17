const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  publicRuntimeConfig: {
    APP_NAME: 'Ignob',
    API_DEVELOPMENT: 'http://localhost:3001/v1',
    API_PRODUCTION: 'https://ignob-backend-rails-api.herokuapp.com/v1',
    PRODUCTION: process.env.NODE_ENV === 'production',
    DOMAIN_DEVELOPMENT: 'http://localhost:3000',
    DOMAIN_PRODUCTION: 'https://ignob-blog-site.herokuapp.com',
    FB_APP_ID: '224791541919508',
    DISQUS_SHORTNAME: 'gravinash-blog',
    GOOGLE_CLIENT_ID: '451267118385-ae8h21u07q358q14c4gtfomvflb2srs3.apps.googleusercontent.com',
    CLOUDINARY_CLOUDNAME: 'ticekralt'
  }
});