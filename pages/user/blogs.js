import { useState, useEffect } from 'react';
import Link from 'next/link';
import { listFromUser } from '../../actions/blog';
import SmallCardUpdateDelete from '../../components/blog/SmallCardUpdateDelete';
import { isAuth } from '../../actions/auth';
import Layout from '../../components/Layout';
import { SecondaryButtonLink } from '../../components/Button';

const UserBlogs = () => {
  const [values, setValues] = useState({
    error: '',
    success: '',
    loading: false
  });

  const { error, success, loading } = values;

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    // fetch blogs from this user
    listFromUser(isAuth()).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: '' });
        setBlogs(data);
      }
    });
  }

  const listBlogs = () => (
    blogs && blogs.map((blog, i) => (
      <SmallCardUpdateDelete key={i} blog={blog} onDelete={loadBlogs} />
    ))
  )

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2 py-4 d-flex align-items-center justify-content-between">
            <h2 className="pl-3">Manage my blogs</h2>
            <Link href="/blogs/new"><SecondaryButtonLink className="mr-3">Create blog</SecondaryButtonLink></Link>
          </div>
          <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
            {listBlogs()}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserBlogs;