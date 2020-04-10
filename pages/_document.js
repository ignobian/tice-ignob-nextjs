import Document, { Html, Head, Main, NextScript } from 'next/document';
// import styled components
import { ServerStyleSheet } from 'styled-components';

// import config
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // create instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();
    // retrieve styles from components in the page
    const page = renderPage((App) => props => sheet.collectStyles(<App {...props} />));

    // extract the styles as style tags
    const styleTags = sheet.getStyleElement();

    // pass styleTags as a prop
    return { ...page, styleTags };
  }

  setGoogleTags() {
    if (publicRuntimeConfig.PRODUCTION) {
      return {
        __html: `
        
        `
      }
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link 
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          />
          <link rel="stylesheet" href="/css/styles.css"/>
          {this.props.styleTags}
          {/* <script dangerouslySetInnerHTML={this.setGoogleTags}></script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;