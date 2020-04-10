import Head from 'next/head';
import Layout from '../../components/Layout';
import { userPublicProfile } from '../../actions/user';
import { API, DOMAIN, APP_NAME } from '../../config';
import moment from 'moment';
import ContactAuthorForm from '../../components/form/ContactAuthorForm';
import { Avatar } from '../../components/Avatar';
import Card from '../../components/blog/Card';
import { Container, Row, Col } from 'reactstrap';
import ClapImg from '../../components/ClapImg';
import FollowButton from '../../components/FollowButton';

const UserProfile = ({ user, blogs }) => {
  const setDefaultSrc = e => {
    e.target.src = '/images/default.png';
  }

  const head = () => (
    <Head>
      <title>{user.name} profile - {APP_NAME}</title>
      <meta name="description" content={`Blogs by ${user.username}`} />

      <link rel="canonical" href={`${DOMAIN}/profile/${user.username}`} />
      <meta property="og:title" content={`${user.username} - ${APP_NAME}`} />
      <meta property="og:description" content={`Blogs by ${user.username}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/profile/${user.username}`} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${API}/user/photo/${user.uniqueUsername}`} />
      <meta property="og:image:secure_url" content={`${API}/user/photo/${user.uniqueUsername}`} />
      <meta property="og:image:type" content="image/jpg" />
      <meta name="robots" content="index,follow" />
      {/* TODO: <meta property="fb:app_id" content={FB_APP_ID} /> */}
    </Head>
  );

  const showRecentPosts = () => (
    blogs && blogs.map((blog, i) => (
      <Card blog={blog} key={i} />
    ))
  )

  const showContactForm = () => (
    <>
      <h5 className="card-title pb-4">Message {user.username}</h5>
      <ContactAuthorForm author={user} />
    </>
  )

  return (
    <>
      {head()}
      <Layout>
        <Container>

          <Row className="mt-4">

            <Col xs="12" md="8">

              <div className="card p-4">
                <div className="d-flex flex-wrap align-items-center">
                  <h3 className="m-0 mr-3 mt-2">{user.name}</h3>
                  <Avatar className="mr-3 mt-2" src={`${API}/user/photo/${user.uniqueUsername}`} alt={user.username} onError={setDefaultSrc} />
                  <div className="flex-grow-1 mt-2">
                    <FollowButton user={user} />
                  </div>
                  <p className="m-0 mt-2" >{user.claps}</p>
                  <ClapImg className="mt-2" style={{ width: 26, marginLeft: 8, marginTop: '0.5rem' }} />
                </div>
                <hr/>
                <div className="details">
                  <p className="text-muted">Joined {moment(user.createdAt).fromNow()}</p>
                  <p>{user.about}</p>
                </div>

              </div>

            </Col>

            <Col xs="12" md="4" className="mt-3">
              {showContactForm()}
            </Col>

            <hr/>

            <Col xs="12">
              <h2 className="my-5">{user.name}'s blogs</h2>
              {showRecentPosts()}
            </Col>

          </Row>

        </Container>

      </Layout>
    </>
  )
}

// ssr
UserProfile.getInitialProps = ({ query }) => {
  return userPublicProfile(query.username).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { user: data.user, blogs: data.blogs }
    }
  });
}

export default UserProfile;