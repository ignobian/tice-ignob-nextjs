import Layout from '../../components/Layout';
import Head from 'next/head';
import { DOMAIN } from '../../config';
import Admin from '../../components/auth/Admin';
import ReportsList from '../../components/admin/ReportsList';
import { Container, Row, Col } from 'reactstrap';
import { SecondaryButtonLink } from '../../components/Button';
import Link from 'next/link';

const Blogs = () => {
  const head = () => (
    <Head>
      <title>Manage reports | {DOMAIN}</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
  )
  return (
    <>
      {head()}
      <Layout>
        <Admin>
          <Container fluid>
            <Row>
              <Col xs="12" md={{size: 10, offset: 1}} className="py-3">
                <h2>Manage reports</h2>
              </Col>
              <Col xs="12" md={{size: 10, offset: 1}} className="py-3">
                <ReportsList/>
              </Col>
              <Col xs="12" md={{size: 10, offset: 1}} className="py-3">
                <Link href="/admin/dashboard"><SecondaryButtonLink>Back to dashboard</SecondaryButtonLink></Link>
              </Col>
            </Row>
          </Container>
        </Admin>
      </Layout>
    </>
  );
}

export default Blogs;