import Head from 'next/head';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import Layout from '../components/Layout';
import Card from '../components/blog/Card';
import sortBy from 'sort-by';
import { isAuth, getCookie } from '../actions/auth';
import { getFeedBlogs } from '../actions/blog';
import { Container, Row, Col } from 'reactstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from '../components/Loading';

const FollowingFeed = () => {
  const head = () => (
    <Head>
      <title>Following feed of {isAuth() && isAuth().name} - {APP_NAME}</title>
      <meta name="description" content={`Following feed of ${isAuth() && isAuth().name}`}/>

      <link rel="canonical" href={`${DOMAIN}/following`} />
      <meta property="og:title" content={`Following Feed - ${APP_NAME}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/following`} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:type" content="image/png" />
      {/* TODO: <meta property="fb:app_id" content={FB_APP_ID} /> */}
    </Head>
  );

  const [values, setValues] = useState({
    blogs: [],
    following: '',
    loading: false
  });

  const { blogs, following, loading } = values;

  useEffect(() => {
    const token = isAuth() && getCookie('token');
    setValues({ ...values, loading: true });

    getFeedBlogs(token).then(data => {
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, loading: false })
      } else {
        setValues({ ...values, blogs: data.blogs.sort(sortBy('-createdAt')), following: data.following, loading: false });
      }
    });
  }, []);

  const showBlogs = () => (
    blogs && blogs.map((blog, i) => (
      <Card key={i} blog={blog}/>
    ))
  )

  const showLoading = () => loading && <Loading />

  return (
    <>
      {head()}
      {showLoading()}
      <Layout>
        <main>
          <Container fluid>
            <Row>

              <Col md={{size: 10, offset: 1}} className="py-3 d-flex align-items-center">
                <h1 style={{ opacity: 0.8 }}>Following Feed</h1>
                <p className="m-0 ml-3">({following} following)</p>
              </Col>

              <Col md={{size: 10, offset: 1}}>
                {showBlogs()}
              </Col>

            </Row>
          </Container>
        </main>
      </Layout>
    </>
  )
}

export default FollowingFeed;