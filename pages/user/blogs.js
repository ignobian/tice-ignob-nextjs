import { useState, useEffect } from 'react';
import Head from 'next/head';
import { APP_NAME, DOMAIN } from '../../config';
import Link from 'next/link';
import { listFromUser } from '../../actions/blog';
import SmallCardUpdateDelete from '../../components/blog/SmallCardUpdateDelete';
import { isAuth, getCookie } from '../../actions/auth';
import Private from '../../components/auth/Private';
import Layout from '../../components/Layout';
import { SecondaryButtonLink } from '../../components/Button';

const UserBlogs = () => {
  const head = () => (
    <Head>
      <title>Manage my blog posts - {APP_NAME}</title>
      <meta name="description" content={`Manage my blog posts at ${APP_NAME}'s blog site with blogs geared towards tech`} />

      <link rel="canonical" href={DOMAIN} />
      <meta property="og:title" content={`Manage my blog posts at ${APP_NAME}`} />
      <meta property="og:description" content={`Manage my blog posts at ${APP_NAME}'s blog site with blogs geared towards tech`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={DOMAIN} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:type" content="image/jpg" />
      <meta name="robots" content="index,follow" />
    </Head>
  )

  const [values, setValues] = useState({
    error: '',
    success: '',
    loading: false
  });

  const { error, success, loading } = values;

  const [blogs, setBlogs] = useState([]);

  const token = isAuth() && getCookie('token');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    // fetch blogs from this user
    listFromUser(token).then(data => {
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
    <Private>
      {head()}
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
    </Private>
  );
}

export default UserBlogs;