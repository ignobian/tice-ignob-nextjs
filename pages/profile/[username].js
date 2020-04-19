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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Image, Transformation } from 'cloudinary-react';

const Stats = styled.div`
  display: flex;
  .left {
    text-align: right;
  }
  .right {
    margin-left: 5px;
    img, svg {
      display: block;
      height: 24px;
    }
  }
`;

const UserProfile = ({ user, blogs }) => {
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

      <meta property="og:image" content={`${API}/user/photo/${user.username}`} />
      <meta property="og:image:secure_url" content={`${API}/user/photo/${user.username}`} />
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
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="m-0">{user.name}</h3>
                  <Image style={{width: 50, height: 50, borderRadius: '50%'}} publicId={user.photo && user.photo.key} alt={user.username}>
                    <Transformation width="200" crop="fill" />
                  </Image>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <FollowButton user={user} />

                  <Stats>
                    <div className="left">
                      <p className="m-0 mr-1">{user.claps.length}</p>
                      <p className="m-0 mr-1">{user.impressions.length}</p>
                      <p className="m-0 mr-1">{user.shares.length}</p>
                    </div>
                    <div className="right">
                      <ClapImg style={{ width: 26 }} />
                      <FontAwesomeIcon width="20" icon={['far', 'eye']} />
                      <FontAwesomeIcon style={{marginLeft: 2}} width="14" icon={['fas', 'share-alt']} />
                    </div>
                  </Stats>
                </div>
                <hr/>
                <p className="text-muted">Joined {moment(user.createdAt).fromNow()}</p>
                <p>{user.about}</p>

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
    console.log(data);
    if (data.error) {
      console.log(data.error);
    } else {
      return { user: data.user, blogs: data.blogs }
    }
  });
}

export default UserProfile;