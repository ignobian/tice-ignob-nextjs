import Layout from "../components/Layout"
import SigninComponent from "../components/auth/SigninComponent"
import Link from 'next/link';
import { withRouter } from 'next/router';
import { H2 } from '../components/Heading';
import { DefaultLink } from '../components/Link';

const Signin = ({ router }) => {
  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">
        {router.query.message}
      </div>
    }
  }
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-10 col-md-6 offset-1 offset-md-3">
            <H2 className="text-center my-4">Sign in</H2>
            {showRedirectMessage()}
            <SigninComponent/>
            <div className="mt-5" style={{opacity: 0.8}}>
              <p className="mb-2">No account?</p>
              <Link href="/signup"><DefaultLink>Sign up</DefaultLink></Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withRouter(Signin);