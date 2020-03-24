import Layout from '../../components/Layout';
import Link from 'next/link';
import ProfileUpdate from '../../components/auth/ProfileUpdate';
import Private from '../../components/auth/Private';
import Head from 'next/head';
import { API, APP_NAME, DOMAIN } from '../../config';

const UserUpdate = () => {
  const head = () => (
    <Head>
      <title>Update your profile - {APP_NAME}</title>
      <meta name="description" content="Update profile - Gravinash blog site with blogs geared towards tech" />

      <link rel="canonical" href={`${DOMAIN}/user/update`} />
      <meta property="og:title" content={`Welcome to ${APP_NAME}`} />
      <meta property="og:description" content="Update profile - Gravinash blog site with blogs geared towards tech" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/user/update`} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:type" content="image/png" />
    </Head>
  )
  return (
    <Layout>
      {head()}
      <Private>
        <div className="container-fluid">
          <div className="row">
            <ProfileUpdate/>
          </div>
        </div>
      </Private>
    </Layout>
  );
}

export default UserUpdate;