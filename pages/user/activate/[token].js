import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import Router, { withRouter } from 'next/router';
import { signup } from '../../../actions/auth';
import Loading from '../../../components/Loading';

const ActivateAccount = ({ router }) => {

  const [values, setValues] = useState({
    error: '',
    loading: true
  });

  const { error, loading } = values;

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

  const showLoading = () => loading && <Loading/>
  const showError = () => error && <div className="alert alert-danger">{error}</div>

  return (
    <Layout>
      {!error && (
        <h2 className="mt-5">Getting things ready...</h2>
      )}
      {showError()}
      {showLoading()}
    </Layout>
  )
}

export default withRouter(ActivateAccount);