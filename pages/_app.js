import App from 'next/app';

import { config, library } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // skip auto adding

// import icons
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />
  }
}

export default MyApp;