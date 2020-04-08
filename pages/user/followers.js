import Layout from '../../components/Layout';
import FollowerList from '../../components/user/FollowerList';
import Private from '../../components/auth/Private';
import Head from 'next/head';
import { APP_NAME, DOMAIN } from '../../config';
import { Container, Row, Col } from 'reactstrap';

const UserUpdate = () => {
  const head = () => (
    <Head>
      <title>My followers - {APP_NAME}</title>
      <meta name="description" content="My followers - Gravinash blog site with blogs geared towards tech" />

      <link rel="canonical" href={`${DOMAIN}/user/followers`} />
      <meta property="og:title" content={`My followers - ${APP_NAME}`} />
      <meta property="og:description" content="My followers - Gravinash blog site with blogs geared towards tech" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/user/followers`} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:type" content="image/png" />
      <meta name="robots" content="index,follow" />
    </Head>
  )
  return (
    <Layout>
      {head()}
      <Private>
        <Container>
          <Row>
            <Col xs="12">
              <FollowerList/>
            </Col>
          </Row>
        </Container>
      </Private>
    </Layout>
  );
}

export default UserUpdate;