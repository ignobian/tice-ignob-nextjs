import Layout from '../components/Layout';
import { listSearch } from '../actions/blog';
import { useEffect, useState } from 'react';
import Card from '../components/blog/Card';
import Head from 'next/head';
import { API, DOMAIN, APP_NAME } from '../config';

const Search = ({ blogs, query }) => {
  const head = () => (
    <Head>
      <title>Search results for {query} - {APP_NAME}</title>
      <meta name="description" content="Gravinash blog site with blogs geared towards tech" />

      <link rel="canonical" href={DOMAIN} />
      <meta property="og:title" content={`Welcome to ${APP_NAME}`} />
      <meta property="og:description" content="Gravinash blog site with blogs geared towards tech" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={DOMAIN} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:type" content="image/jpg" />
      <meta name="robots" content="index,follow" />
    </Head>
  );

  const [error, setError] = useState('');
  console.log(blogs);

  const listBlogs = () => (
    blogs && blogs.map((blog, i) => (
      <Card key={i} blog={blog}/>
    ))
  );

  const showError = () => error && <div className="alert alert-danger">{error}</div>

  return (
    <>
      {head()}
        <Layout>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8 offset-md-2">

                <div className="my-5">
                  <h2 style={{fontWeight:"100"}}>Search results for</h2>
                  <h2 style={{fontWeight:"100"}}>'{query}'</h2>
                </div>

              </div>

              <div className="col-12 col-md-8 offset-md-2">
                {showError()}

                {blogs.length ? (
                  <>{listBlogs()}</>
                ) : (
                  <div className="my-5">
                    <p className="text-muted">
                      No blogs found!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </Layout>
    </>
  );
}

Search.getInitialProps = ({ query: { query } }) => {
  return listSearch(query).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blogs: data, query }
    }
  });
}

export default Search;