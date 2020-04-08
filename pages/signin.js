import Layout from "../components/Layout";
import Head from 'next/head';
import SigninComponent from "../components/auth/SigninComponent";
import Link from 'next/link';
import { withRouter } from 'next/router';
import { H2 } from '../components/Heading';
import { DefaultLink } from '../components/Link';
import { APP_NAME, DOMAIN } from '../config';

const Signin = ({ router }) => {
  const head = () => (
    <Head>
      <title>Sign in - {APP_NAME}</title>
      <meta name="description" content={`Sign in to ${APP_NAME}'s blog site`} />

      <link rel="canonical" href={DOMAIN} />
      <meta property="og:title" content={`Sign in to ${APP_NAME}`} />
      <meta property="og:description" content={`Sign in to ${APP_NAME}'s blog site`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={DOMAIN} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:type" content="image/jpg" />
      <meta name="robots" content="index,follow" />
    </Head>
  )

  const showActivateMessage = () => {
    if (router.query.activate) {
      return <div className="text-muted mt-4">Your account has been activated! Please sign in</div>
    }
  }

  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">
        {router.query.message}
      </div>
    }
  }
  return (
    <>
      {head()}
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-10 col-md-6 offset-1 offset-md-3">
              {showActivateMessage()}
              <H2 className="text-center my-4">Sign in</H2>
              {showRedirectMessage()}
              <SigninComponent/>
              <div className="mt-4" style={{opacity: 0.8}}>
                <p className="mb-2">No account?</p>
                <Link href="/signup"><DefaultLink>Sign up</DefaultLink></Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default withRouter(Signin);