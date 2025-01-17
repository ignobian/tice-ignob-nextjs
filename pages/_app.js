import App from 'next/app';

import { config, library } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // skip auto adding

import { wakeUp } from '../actions/general';

import { CLOUDINARY_CLOUDNAME } from '../config';

// import icons
import { faFacebookSquare, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { CloudinaryContext } from 'cloudinary-react';

library.add(
  faSearch,
  faFacebookSquare,
  faLinkedin,
  faTwitter,
  faEye,
  faShareAlt
);

class MyApp extends App {
  componentDidMount() {
    wakeUp().then(data => {
      console.log(data);
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <CloudinaryContext cloudName={CLOUDINARY_CLOUDNAME}>
        <Component {...pageProps} />
      </CloudinaryContext>
    )
  }
}

export default MyApp;