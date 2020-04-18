import Layout from '../../../components/Layout';
import CanUpdateBlog from '../../../components/auth/CanUpdateBlog';
import BlogCreateUpdate from '../../../components/crud/BlogCreateUpdate';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { DOMAIN } from '../../../config';

const Blog = ({ router }) => {
  const head = () => (
    <Head>
      <title>Update blog - {DOMAIN}{router.query.slug}</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
  );

  return (
    <>
      {head()}
      <Layout>
        <CanUpdateBlog slug={router.query.slug}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 py-3">
                <h2 className="pl-3">Update blog</h2>
              </div>
              <div className="col-12">
                <BlogCreateUpdate slug={router.query.slug} />
              </div>
            </div>
          </div>
        </CanUpdateBlog>
      </Layout>
    </>
  );
}

export default withRouter(Blog);