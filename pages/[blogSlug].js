import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getBlog, listRelated, addClap } from '../actions/blog';
import { addShare } from '../actions/share';
import { addImpression } from '../actions/reach';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import moment from 'moment';
import renderHtml from 'react-render-html';
import RelatedBlog from '../components/blog/RelatedBlog';
import DisqusThread from '../components/DisqusThread';
import { DefaultLink } from '../components/Link';
import styled from 'styled-components';
import { Avatar } from '../components/Avatar';
import { ClapImg } from '../components/ClapImg';
import { CategoryBtn, TagBtn, NoButton } from '../components/Button';
import { isAuth, getCookie } from '../actions/auth';
import FollowButton from '../components/FollowButton';
import { Container, Row, Col } from 'reactstrap';
import ReportBtn from '../components/ReportBtn';
import { H1 } from '../components/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../components/Error';

const Banner = styled.div`
  height: 300px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const SocialIconsContainer = styled.div`
  svg {
    width: 18px;
    margin-right: 10px;
  }
`;

const singleBlog = ({ blog, error }) => {
  if (error) return <Error content={error} />

  const keywords = blog.tags.concat(blog.keywords || []);
  keywords.unshift(blog.title);

  const head = () => (
    <Head>
      <title>{blog.title}</title>
      <meta name="description" content={blog.mdesc} />
      <meta name="keywords" content={keywords.join(',').substr(0, 255)} />
      <meta name="author" content={blog.user.name} />

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

  const token = isAuth() ? getCookie('token') : null;

  const [related, setRelated] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadRelated();
    setClaps();
    initImpression();
  }, []);

  const setClaps = () => {
    setCount(blog.claps.length);
  }

  const initImpression = () => {
    // add an impression to the backend
    const blogId = blog.id;
    const blogPostedById = blog.user.id;
    addImpression(blogId, blogPostedById, token).then(data => {
      if (data.error) {
        console.log(data.error);
      }
    });
  }

  const loadRelated = () => {
    listRelated(blog).then(data => {
      if (data.error) {
        console.log(data.error);
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

  const handleShare = (type, link) => e => {
    // add a share to the backend
    const blogId = blog.id;
    const blogPostedById = blog.user.id;
    addShare(type, blogId, blogPostedById, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        // open window in a new tab with the sharable link
        window.open(link, '_blank');
      }
    });
  }

  const setDefaultSrc = e => {
    e.target.src = '/images/default.png';
  }

  const showComments = () => (
    <div className="w-100">
      <DisqusThread id={blog.id} title={blog.title} path={`/blog/${blog.slug}`} />
    </div>
  )

  const showCategories = blog => (
    <div className="d-flex flex-wrap">
      {blog.categories.map(c => (
        <Link key={c.id} href={`/categories/${c.slug}`}>
          <CategoryBtn style={{fontSize: 17}} className="m-0 mr-2"># {c.name}</CategoryBtn>
        </Link>
      ))}
    </div>
  );
  
  const showTags = blog => (
    <div className="d-flex flex-wrap mt-2">
      {blog.tags.map(t => (
        <Link key={t.id} href={`/tags/${t.slug}`}>
          <TagBtn className="m-0 mr-2">{t.name}</TagBtn>
        </Link>
      ))}
    </div>
  );

  const showRelated = blogs => (
    blogs.map(b => (
      <RelatedBlog key={b.id} blog={b} />
    ))
  );

  const showSocialIcons = () => {
    const url = `${DOMAIN}/${blog.slug}`;
    const twitterLink = `https://twitter.com/intent/tweet?text=${blog.title} by @${blog.user.username} ${url}`;
    const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    const facebookLink = `https://www.facebook.com/v3.3/dialog/share?app_id=${FB_APP_ID}&${url}&display=page&redirect_uri=${url}?facebook=true`
    return (
      <SocialIconsContainer className="d-md-inline">
        <NoButton className="p-0 pr-1" onClick={handleShare('twitter', twitterLink)}><DefaultLink><FontAwesomeIcon icon={['fab', 'twitter']}/></DefaultLink></NoButton>
        <NoButton className="p-0 pr-1" onClick={handleShare('linkedin', linkedinLink)}><DefaultLink><FontAwesomeIcon icon={['fab', 'linkedin']}/></DefaultLink></NoButton>
        <NoButton className="p-0 pr-1" onClick={handleShare('facebook', facebookLink)}><DefaultLink><FontAwesomeIcon icon={['fab', 'facebook-square']}/></DefaultLink></NoButton>
      </SocialIconsContainer>
    )
  }

  const showAuthor = (user) => (
    <div className="d-flex my-3">
      <Avatar className="mr-3" src={`${API}/user/photo/${user.username}`} onError={setDefaultSrc} />
      <div className="flex-grow-1">
        <div className="d-md-inline">
          <Link href={`/profile/${user.username}`}><DefaultLink>{user.username}</DefaultLink></Link>
          <span className="ml-2">| <FollowButton noborder user={user} /></span>
        </div>
        <div className="d-md-inline mr-md-4">
          <span className="d-none d-md-inline mr-md-2"> | </span>
          <span>Posted {moment(blog.createdAt).fromNow()}</span>
        </div>
        {showSocialIcons()}
      </div>
      <div className="align-self-center">
        {showClap()}
      </div>
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
                {showAuthor(blog.user)}
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
      return { error: data.error }
    } else {
      return { blog: data }
    }
  });
}

export default singleBlog;