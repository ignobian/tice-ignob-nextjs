import Head from 'next/head';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import Layout from '../../components/Layout';
import { getCategory } from '../../actions/category';
import Card from '../../components/blog/Card';

const Category = ({ category, blogs }) => {
  const head = () => (
    <Head>
      <title>Category {category.name} - {APP_NAME}</title>
      <meta name="description" content={`Best programming tutorials on ${category.name}`}/>

      <link rel="canonical" href={`${DOMAIN}/categories/${category.slug}`} />
      <meta property="og:title" content={`Category ${category.name} - ${APP_NAME}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/categories/${category.slug}`} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:type" content="image/png" />
      <meta name="robots" content="index,follow" />
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
            <div className="row">

              <div className="col-md-8 offset-md-2 py-5 border-bottom">
                <h1 style={{fontWeight: '100', fontSize: '5em', opacity: 0.6}}># {category.name}</h1>
              </div>
              <div className="col-md-8 offset-md-2">
                {showBlogs()}
              </div>

            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}

// ssr
Category.getInitialProps = ({ query }) => {
  return getCategory(query.slug).then(data => {
    console.log(data);
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category, blogs: data.blogs }
    }
  });
}

export default Category;