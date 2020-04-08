import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import Category from '../../components/crud/Category';
import { Container, Row, Col } from 'reactstrap';
import Head from 'next/head';
import { DOMAIN } from '../../config';

const CategoryTag = () => {
  const head = () => (
    <Head>
      <title>Manage categories for {DOMAIN}</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
  )

  return (
    <>
      {head()}
      <Layout>
        <Admin>
          <Container>
            <Row>
              <Col xs="12" md={{size: 8, offset: 2}}>
                <h2 className="my-4">Manage Categories</h2>
                <Category/>
              </Col>
            </Row>
          </Container>
        </Admin>
      </Layout>
    </>
  );
}

export default CategoryTag;