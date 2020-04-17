import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import Router, { withRouter } from 'next/router';
import { signup } from '../../../actions/auth';
import Head from 'next/head';
import { APP_NAME } from '../../../config';
import Link from 'next/link';
import { DefaultLink } from '../../../components/Link';
import { Container, Row, Col } from 'reactstrap';

const ActivateAccount = ({ router }) => {

  const head = () => (
    <Head>
      <title>Activate your account on {APP_NAME}</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
  )

  const [values, setValues] = useState({
    error: ''
  });

  const { error } = values;

  useEffect(() => {
    if (router.query.token) {
      signup(router.query.token).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          // redirect to the sign in page with signup being true in params
          Router.push('/signin?activate=true');
        }
      });
    }
  }, [router]);

  return (
    <>
      {head()}
      <Layout>
        <Container>
          <Row>
            <Col xs="12">
              {!error ? (
                <h5 className="mt-5">Getting things ready...</h5>
              ) : (
                <>
                  <p className="text-muted mt-5 mb-3">Something went wrong...</p>
                  <p className="text-muted">Please <Link href="/signup"><DefaultLink>sign up</DefaultLink></Link> again</p>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  )
}

export default withRouter(ActivateAccount);