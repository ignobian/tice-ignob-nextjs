import Layout from '../../components/Layout';
import Link from 'next/link';
import Admin from '../../components/auth/Admin';
import BlogRead from '../../components/crud/BlogRead';

const Blogs = () => {
  return (
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
  );
}

export default Blogs;