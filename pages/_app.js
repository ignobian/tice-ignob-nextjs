import App from 'next/app';

import { config, library } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // skip auto adding

// import icons
import { faFacebookSquare, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(
  faSearch,
  faFacebookSquare,
  faLinkedin,
  faTwitter
);

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />
  }
}

export default MyApp;