import App from 'next/app';

import { config, library } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // skip auto adding

// import icons
import { faFacebookSquare, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

library.add(
  faSearch,
  faFacebookSquare,
  faLinkedin,
  faTwitter,
  faEye,
  faShareAlt
);

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />
  }
}

export default MyApp;