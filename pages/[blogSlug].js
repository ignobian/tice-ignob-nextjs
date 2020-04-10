import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getBlog, listRelated, addClap } from '../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import moment from 'moment';
import renderHtml from 'react-render-html';
import RelatedBlog from '../components/blog/RelatedBlog';
import DisqusThread from '../components/DisqusThread';
import { DefaultLink } from '../components/Link';
import styled from 'styled-components';
import { Avatar } from '../components/Avatar';
import { ClapImg } from '../components/ClapImg';
import { CategoryBtn, TagBtn } from '../components/Button';
import { isAuth } from '../actions/auth';
import FollowButton from '../components/FollowButton';
import { Container, Row, Col } from 'reactstrap';
import ReportBtn from '../components/ReportBtn';
import { H1 } from '../components/Typography';

const Banner = styled.div`
  height: 300px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const singleBlog = ({ blog }) => {
  const keywords = blog.tags.concat(blog.keywords || []);
  keywords.unshift(blog.title);

  const head = () => (
    <Head>
      <title>{blog.title}</title>
      <meta name="description" content={blog.mdesc} />
      <meta name="keywords" content={keywords.join(',').substr(0, 255)} />
      <meta name="author" content={blog.postedBy.name} />

      <link rel="canonical" href={`${DOMAIN}/${blog.slug}`} />
      <meta property="og:title" content={`${blog.title}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/${blog.slug}`} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
      <meta property="og:image:type" content="image/jpg" />
      {/* TODO: <meta property="fb:app_id" content={FB_APP_ID} /> */}
      <meta name="robots" content="index,follow" />
    </Head>
  );

  const [related, setRelated] = useState([]);
  const [error, setError] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadRelated();
    setClaps();
  }, []);

  const setClaps = () => {
    setCount(blog.claps.length);
  }

  const loadRelated = () => {
    listRelated(blog).then(data => {
      if (data.error) {
        console.log(err);
      } else {
        setRelated(data);
      }
    });
  }

  const handleClap = () => {
      addClap(blog, isAuth()).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        // update the clap with plus one
        setError('');
        setCount(count + 1);
      }
    });
  }

  const setDefaultSrc = e => {
    e.target.src = '/images/default.png';
  }

  const showComments = () => (
    <div className="w-100">
      <DisqusThread id={blog._id} title={blog.title} path={`/blog/${blog.slug}`} />
    </div>
  )

  const showCategories = blog => (
    <div className="d-flex flex-wrap">
      {blog.categories.map((c, i) => (
        <Link key={i} href={`/categories/${c.slug}`}>
          <CategoryBtn style={{fontSize: 17}} className="m-0 mr-2"># {c.name}</CategoryBtn>
        </Link>
      ))}
    </div>
  );
  
  const showTags = blog => (
    <div className="d-flex flex-wrap mt-2">
      {blog.tags.map((t, i) => (
        <Link key={i} href={`/tags/${t}`}>
          <TagBtn className="m-0 mr-2">{t}</TagBtn>
        </Link>
      ))}
    </div>
  );

  const showRelated = blogs => (
    blogs.map((b, i) => (
      <RelatedBlog blog={b} />
    ))
  );

  const showAuthor = (user) => (
    <div className="d-flex flex-wrap align-items-center my-3">
      <Avatar className="mr-2" src={`${API}/user/photo/${user.uniqueUsername}`} onError={setDefaultSrc} />
      <Link href={`/profile/${user.uniqueUsername}`}><DefaultLink>{user.username}</DefaultLink></Link>
      <span className="ml-2">| <FollowButton noborder user={user} />  | </span>
      <span className="ml-2 text-muted flex-grow-1">Posted {moment(blog.createdAt).fromNow()}</span>
      {showClap()}
    </div>
  );

  const showClap = () => (
    <div>
      <span className="mr-2">{count}</span>
      <ClapImg onClick={handleClap} width="36" src="/images/clap.svg" alt="Clap"/>
    </div>
  );

  return (
    <>
      {head()}
      <Layout>
        <main>
          <Banner>
            <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} />
          </Banner>

          <Container>
            <Row>

              <Col xs="12" md={{size: 10, offset: 1}}>
                {showAuthor(blog.postedBy)}
              </Col>


              <Col xs="12" md={{size: 10, offset: 1}} className="mt-md-4 mt-3 d-flex align-items-center">
                <div>
                  {showCategories(blog)}
                  {showTags(blog)}
                </div>
  
              </Col>

              <Col xs="12" md={{size: 10, offset: 1}} style={{overflowX: 'hidden'}}>
                <H1 className="my-4">{blog.title}</H1>
              </Col>

              <Col xs="12" md={{size: 10, offset: 1}}>
                {renderHtml(blog.body)}
              </Col>

              <Col className="mt-4 d-flex justify-content-end" xs="12" md={{size: 10, offset: 1}}>
                <ReportBtn blog={blog} />
              </Col>

            </Row>

            <Row className="text-center py-3">
              <Col xs="12">
                <hr/>
                <h4>Related</h4>
                <div className="d-flex flex-wrap justify-content-center">
                  {showRelated(related)}
                </div>
              </Col>
            </Row>

            <Row className="text-center py-5">
              <hr/>
              {showComments()}

            </Row>
          </Container>

        </main>
      </Layout>
    </>
  )
};

// ssr
singleBlog.getInitialProps = ({ query }) => {
  return getBlog(query.blogSlug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data }
    }
  });
}

export default singleBlog;