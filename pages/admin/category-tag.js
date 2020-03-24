import Layout from '../../components/Layout';
import Link from 'next/link';
import Admin from '../../components/auth/Admin';
import Category from '../../components/crud/Category';
import Tag from '../../components/crud/Tag';

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 py-3">
              <h2>Manage Categories and Tags</h2>
            </div>
            <div className="col-sm-6">
              <p>Categories</p>
              <Category/>
            </div>
            <div className="col-sm-6">
              <p>Tags</p>
              <Tag />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
}

export default CategoryTag;