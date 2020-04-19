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
import { H1 } from '../components/Typography';

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
      <meta name="robots" content="index,follow" />
      {/* TODO: <meta property="fb:app_id" content={FB_APP_ID} /> */}
    </Head>
  );

  const [values, setValues] = useState({
    blogs: [],
    following: 0,
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
        setValues({ ...values, blogs: data.blogs, following: data.following, loading: false });
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

              <Col xs="12" md={{size: 10, offset: 1}} className="py-3 d-flex align-items-center">
                <Row className="w-100 align-items-center">
                  <Col xs="12" md="6" lg="4">
                    <H1 style={{ opacity: 0.8 }}>Following Feed</H1>
                  </Col>
                  <Col xs="12" md="6" lg="8">
                    <p className="m-0 ml-md-3">({following} following)</p>
                  </Col> 
                </Row>
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