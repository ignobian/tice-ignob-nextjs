import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { userPublicProfile } from '../../actions/user';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import moment from 'moment';

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

      <meta property="og:image" content={`${API}/user/photo/${user.uniqueUsername}`} />
      <meta property="og:image:secure_url" content={`${API}/user/photo/${user.uniqueUsername}`} />
      <meta property="og:image:type" content="image/jpg" />
      {/* TODO: <meta property="fb:app_id" content={FB_APP_ID} /> */}
    </Head>
  );

  const showRecentPosts = () => (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title pb-4">Recent blogs by {user.username}</h5>
        {blogs && blogs.map((blog, i) => (
          <div className="my-4" key={i}>
            <Link href={`/blogs/${blog.slug}`}>
              <a className="lead">{blog.title}</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )

  const showContactForm = () => (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title pb-4">Message {user.username}</h5>
        <p>Contact form</p>
      </div>
    </div>
  )

  return (
    <>
      {head()}
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card mt-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h3>{user.name}</h3>
                      <hr/>
                      <p className="text-muted">Joined {moment(user.createdAt).fromNow()}</p>
                    </div>
                    <div className="col-md-4">
                      <img width="150" className="p-3" src={`${API}/user/photo/${user.uniqueUsername}`} alt=""/>
                      <hr/>
                      <div className="about">
                        {user.about}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr/>

        <div className="container pb-5">
          <div className="row">
            <div className="col-md-6">
              {showRecentPosts()}
            </div>

            <div className="col-md-6">
              {showContactForm()}
            </div>
          </div>
        </div>
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