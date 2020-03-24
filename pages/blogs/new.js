import Layout from '../../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import { APP_NAME, DOMAIN } from '../../config';
import PrivateOrAdmin from '../../components/auth/PrivateOrAdmin';
import BlogCreateUpdate from '../../components/crud/BlogCreateUpdate';

const BlogNew = () => {
  const head = () => (
    <Head>
      <title>Create a new blog - {APP_NAME} Blogs about tech</title>
      <meta name="description" content="Gravinash blog site with blogs geared towards tech" />

      <link rel="canonical" href={`${DOMAIN}/blogs/new`} />
      <meta property="og:title" content={`Create a new blog - ${APP_NAME}`} />
      <meta property="og:description" content="Gravinash blog site with blogs geared towards tech" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/new`} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:type" content="image/png" />
    </Head>
  )
  return (
    <>
      {head()}
      <Layout>
        <PrivateOrAdmin>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 py-4">
                <h2>Create blog</h2>
              </div>
            </div>
          </div>
          <BlogCreateUpdate/>
        </PrivateOrAdmin>
      </Layout>
    </>
  );
}

export default BlogNew;