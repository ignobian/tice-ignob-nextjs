import Layout from "../components/Layout"
import SignupComponent from "../components/auth/SignupComponent"
import Link from 'next/link';
import { DefaultLink } from '../components/Link';
import { H2 } from '../components/Heading';

const Signup = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-10 col-md-6 offset-1 offset-md-3">
            <H2 className="text-center my-4">Sign up</H2>
            <SignupComponent />
            <div className="mt-5" style={{ opacity: 0.8 }}>
              <p className="mb-2 ">Already have an account?</p>
              <Link href="/signin"><DefaultLink>Sign in</DefaultLink></Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Signup;