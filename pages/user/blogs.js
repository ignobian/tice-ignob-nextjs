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
import { Container, Row, Col } from 'reactstrap';
import { H2 } from '../../components/Typography';

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
        <Container fluid>
          <Row>

            <Col xs="12" md={{size: 10, offset: 1}} lg={{size: 8, offset: 2}} className="py-4">
              <H2 className="mb-4">Manage my blogs</H2>
              <Link href="/blogs/new"><SecondaryButtonLink>Create blog</SecondaryButtonLink></Link>
            </Col>

            <Col xs="12" md={{size: 10, offset: 1}} lg={{size: 8, offset: 2}}>
              {listBlogs()}
            </Col>

          </Row>
        </Container>
      </Layout>
    </Private>
  );
}

export default UserBlogs;