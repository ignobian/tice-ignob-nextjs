import Layout from '../../components/Layout';
import Head from 'next/head';
import { DOMAIN } from '../../config';
import Admin from '../../components/auth/Admin';
import BlogRead from '../../components/crud/BlogRead';

const Blogs = () => {
  const head = () => (
    <Head>
      <title>Manage all blogs | {DOMAIN}</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
  )
  return (
    <>
      {head()}
      <Layout>
        <Admin>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8 offset-md-8 py-3">
                <h2>Manage blogs</h2>
              </div>
              <div className="col-12 col-md-8 offset-md-8">
                <BlogRead/>
              </div>
            </div>
          </div>
        </Admin>
      </Layout>
    </>
  );
}

export default Blogs;