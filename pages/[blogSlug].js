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

const Banner = styled.div`
  height: 300px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const singleBlog = ({ blog }) => {
  const head = () => (
    <Head>
      <title>{blog.title} - {APP_NAME}</title>
      <meta name="description" content={blog.mdesc} />

      <link rel="canonical" href={`${DOMAIN}/blogs/${blog.slug}`} />
      <meta property="og:title" content={`${blog.title} - ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blog/${blog.slug}`} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
      <meta property="og:image:type" content="image/jpg" />
      {/* TODO: <meta property="fb:app_id" content={FB_APP_ID} /> */}
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
    <div>
      <DisqusThread id={blog._id} title={blog.title} path={`/blog/${blog.slug}`} />
    </div>
  )

  const showCategories = blog => (
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <CategoryBtn className="m-0 mr-2"># {c.name}</CategoryBtn>
      </Link>
    ))
  );
  
  const showTags = blog => (
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <TagBtn className="m-0 mr-2">{t.name}</TagBtn>
      </Link>
    ))
  );

  const showRelated = blogs => (
    blogs.map((b, i) => (
      <RelatedBlog blog={b} />
    ))
  );

  const showAuthor = (user) => (
    <div className="d-flex align-items-center my-3">
      <Avatar className="mr-2" src={`${API}/user/photo/${user.uniqueUsername}`} onError={setDefaultSrc} />
      <Link href={`/profile/${user.uniqueUsername}`}><DefaultLink>{user.username}</DefaultLink></Link>
      <span className="ml-2 text-muted flex-grow-1"> | Posted {moment(blog.createdAt).fromNow()}</span>
      {showClap()}
    </div>
  );

  const showClap = () => (
    <>
      <span className="mr-2" style={{fontSize: '22px'}}>{count}</span>
      <ClapImg onClick={handleClap} width="36" src="/images/clap.svg" alt="Clap"/>
    </>
  );

  return (
    <>
      {head()}
      <Layout>
        <main>
          <Banner>
            <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} />
          </Banner>

          <div className="container">
            <div className="row">

              <div className="col-md-10 offset-md-1">
                {showAuthor(blog.postedBy)}
              </div>


              <div className="mt-4 col-md-10 offset-md-1">
                {showCategories(blog)}
                {showTags(blog)}
              </div>

              <div className="col-md-10 offset-md-1" style={{overflowX: 'hidden'}}>
                <h1 className="my-4">{blog.title}</h1>
              </div>



              <section className="col-md-10 offset-md-1">
                {renderHtml(blog.body)}
              </section>


            </div>
          </div>

          <div className="container pb-5">
            <div className="text-center py-5 h2">
              <hr/>
              <h4>Related</h4>
              <div className="d-flex flex-wrap justify-content-center">
                {showRelated(related)}
              </div>
            </div>
          </div>

          <div className="container pb-5">
            <div className="text-center py-5 h2">
              <hr/>
              {showComments()}
            </div>
          </div>

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