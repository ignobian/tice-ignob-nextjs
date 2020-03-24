import Head from 'next/head';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import Layout from '../../components/Layout';
import { getTag } from '../../actions/tag';
import Card from '../../components/blog/Card';
import sortBy from 'sort-by';

const Tag = ({ tag, blogs }) => {
  const head = () => (
    <Head>
      <title>Tag {tag.name} - {APP_NAME}</title>

      <meta name="description" content={`Best programming tutorials on ${tag.name}`}/>

      <link rel="canonical" href={`${DOMAIN}/tags/${tag.slug}`} />
      <meta property="og:title" content={`Tag ${tag.title} - ${APP_NAME}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/tags/${tag.slug}`} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:type" content="image/png" />
      {/* TODO: <meta property="fb:app_id" content={FB_APP_ID} /> */}
    </Head>
  );

  const showBlogs = () => (
    blogs && blogs.map((blog, i) => (
      <Card key={i} blog={blog}/>
    ))
  )

  return (
    <>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <div className="col-md-12 py-5 border-bottom">
              <h1 style={{fontWeight: '100', fontSize: '4em', opacity: 0.6}}>{tag.name}</h1>
            </div>
            <div>
              {showBlogs()}
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}

// ssr
Tag.getInitialProps = ({ query }) => {
  return getTag(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { tag: data.tag, blogs: data.blogs.sort(sortBy('-updatedAt')) }
    }
  });
}

export default Tag;