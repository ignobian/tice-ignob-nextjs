import Layout from '../../components/Layout';
import Link from 'next/link';
import Admin from '../../components/auth/Admin';

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 py-3">
              <h2>Admin dashboard</h2>
            </div>
            <div className="col-md-4">
              <ul className="list-group">

                <li className="list-group-item">
                  <Link href="/admin/category-tag">
                    <a>Manage categories and tags</a>
                  </Link>
                </li>
                
                <li className="list-group-item">
                  {/* load this with forced refresh, for style loading in the quill */}
                  <a href="/blogs/new">Create blog</a>
                </li>

                <li className="list-group-item">
                  <Link href="/admin/blogs">
                    <a>Update/Delete blogs</a>
                  </Link>
                </li>

                <li className="list-group-item">
                  <Link href="/user/update">
                    <a>Update profile</a>
                  </Link>
                </li>

              </ul>
            </div>
            <div className="col-md-8">
              right
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
}

export default AdminIndex;