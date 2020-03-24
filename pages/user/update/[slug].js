import Layout from '../../../components/Layout';
import Link from 'next/link';
import CanUpdateBlog from '../../../components/auth/CanUpdateBlog';
import BlogCreateUpdate from '../../../components/crud/BlogCreateUpdate';
import { withRouter } from 'next/router';

const Blog = ({ router }) => {
  return (
    <Layout>
      <CanUpdateBlog slug={router.query.slug}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 py-3">
              <h2 className="pl-3">Update blog</h2>
            </div>
            <div className="col-12">
              <BlogCreateUpdate/>
            </div>
          </div>
        </div>
      </CanUpdateBlog>
    </Layout>
  );
}

export default withRouter(Blog);