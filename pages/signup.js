import Layout from "../components/Layout";
import Head from 'next/head';
import SignupComponent from "../components/auth/SignupComponent";
import Link from 'next/link';
import { DefaultLink } from '../components/Link';
import { H2 } from '../components/Heading';
import { APP_NAME, DOMAIN } from '../config';

const Signup = () => {
  const head = () => (
    <Head>
      <title>Sign up - {APP_NAME}</title>
      <meta name="description" content={`Sign up to ${APP_NAME}'s blog site`} />

      <link rel="canonical" href={DOMAIN} />
      <meta property="og:title" content={`Sign up to ${APP_NAME}`} />
      <meta property="og:description" content={`Sign up to ${APP_NAME}'s blog site`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={DOMAIN} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:type" content="image/jpg" />
      <meta name="robots" content="index,follow" />
    </Head>
  );

  return (
    <>
      {head()}
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-10 col-md-6 offset-1 offset-md-3">
              <H2 className="text-center my-4">Sign up</H2>
              <SignupComponent />
              <div className="mt-5" style={{ opacity: 0.8 }}>
                <p className="mb-2 ">Already have an account?</p>
                <Link href="/signin"><DefaultLink>Sign in</DefaultLink></Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Signup;