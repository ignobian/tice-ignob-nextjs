import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { listRelated, addClap } from '../actions/blog';
import { addShare } from '../actions/share';
import { addImpression } from '../actions/reach';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import moment from 'moment';
import renderHtml from 'react-render-html';
import RelatedBlog from '../components/blog/RelatedBlog';
import { DefaultLink } from '../components/Link';
import styled from 'styled-components';
import Error from '../components/Error';
import { ClapImg } from '../components/ClapImg';
import { CategoryBtn, TagBtn, NoButton } from '../components/Button';
import { isAuth, getCookie } from '../actions/auth';
import { getXmlForCategory } from '../actions/general';
import FollowButton from '../components/FollowButton';
import { Container, Row, Col } from 'reactstrap';
import ReportBtn from '../components/ReportBtn';
import { H1 } from '../components/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Transformation } from 'cloudinary-react';
import cacheFetch, { overrideCache } from '../helpers/cacheFetch';
import BlogComments from '../components/blog/BlogComments';
import generateXmlForCategory from '../helpers/generateXmlForCategory';

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

const BodyContainer = styled.div`
  overflow-x: hidden;
  img {
    max-width: 100%;
  }
`;

const singleBlog = ({ blog, serverError, isServerRendered }) => {
  if (serverError) return <Error content={serverError} />

  const keywords = blog.tags.map(tag => tag.name).concat(blog.keywords || []);
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

      <meta property="og:image" content={`http://res.cloudinary.com/ticekralt/image/upload/c_fill,w_1020/${blog.photo && blog.photo.key}`} />
      <meta property="og:image:secure_url" content={`http://res.cloudinary.com/ticekralt/image/upload/c_fill,w_1020/${blog.photo && blog.photo.key}`} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={FB_APP_ID} />
      <meta name="robots" content="index,follow" />
      {/* Google adsense code */}
      <script data-ad-client="ca-pub-7599944658110193" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    </Head>
  );

  const token = isAuth() ? getCookie('token') : null;

  const [related, setRelated] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRelated();
    setCount(blog.claps);
    initImpression();

    // handle overriding client cache if the page is server rendered
    if (isServerRendered) {
      overrideCache(`${API}/blogs/${blog.slug}`, blog);
    }
  }, []);

  const initImpression = () => {
    // add an impression to the backend
    const blogId = blog.id;
    addImpression(blogId, token).then(data => {
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
    if (token) {
      addClap(blog, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          // update the clap with plus one
          setError('');
          setCount(count + 1);
        }
      });
    } else {
      console.log('Please login to perform this action')
    }
  }

  const handleShare = (type, link) => e => {
    // add a share to the backend
    const blogId = blog.id;
    addShare(type, blogId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        // open window in a new tab with the sharable link
        window.open(link, '_blank');
      }
    });
  }

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
    const facebookLink = `https://www.facebook.com/v3.3/dialog/feed?app_id=${FB_APP_ID}&link=${url}&display=page&redirect_uri=${url}&facebook=true`
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
      <Image style={{borderRadius: '50%', width: 40, height: 40, objectFit: 'cover'}} publicId={user.photo ? user.photo.key : 'VC5fY84CZiCQofi6AAC3TnCc'} className="mr-3" secure="true">
        <Transformation width="100" crop="fill" />
      </Image>
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

  const showError = () => error &&  <Error content={error} />

  return (
    <>
      {head()}
      <Layout>
        <main>
          <Banner>
            <Image publicId={blog.photo && blog.photo.key} alt={blog.title} secure="true">
              <Transformation width='1020' crop="fill" />
            </Image>
          </Banner>

          {showError()}

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
                <BodyContainer>
                  {renderHtml(blog.body)}
                </BodyContainer>
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
              <BlogComments blog={blog} />
            </Row>
          </Container>

        </main>
      </Layout>
    </>
  )
};

// ssr
singleBlog.getInitialProps = async (ctx) => {
  const { query, res } = ctx;
  // check if the endpoint contains xml (then it is used for the categories of sitemap)
  if (query.blogSlug.match(/.xml$/)) {
    const category = query.blogSlug.substring(8, query.blogSlug.length - 4);
    const data = await getXmlForCategory(category);
    
    res.setHeader("Content-Type", "text/xml");
    res.write(generateXmlForCategory(data))
    res.end();
  } else {
    const data = await cacheFetch(`${API}/blogs/${query.blogSlug}`);
  
    const isServerRendered = !!ctx.req;
  
    if (data.error) {
      return { serverError: data.error, isServerRendered: true }
    } else {
      return { blog: data, isServerRendered }
    }
  }

}

export default singleBlog;