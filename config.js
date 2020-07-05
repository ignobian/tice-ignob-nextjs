import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.API_PRODUCTION : publicRuntimeConfig.API_DEVELOPMENT;

export const WS_API = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.WS_API_PRODUCTION : publicRuntimeConfig.WS_API_DEVELOPMENT;

export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.DOMAIN_PRODUCTION : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

export const FB_APP_ID = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.FB_APP_ID_PROD : publicRuntimeConfig.FB_APP_ID_DEV;

export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME;

export const GOOGLE_CLIENT_ID = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.GOOGLE_CLIENT_ID_PROD : publicRuntimeConfig.GOOGLE_CLIENT_ID_DEV;

export const CLOUDINARY_CLOUDNAME = publicRuntimeConfig.CLOUDINARY_CLOUDNAME;