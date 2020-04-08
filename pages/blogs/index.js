import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import Card from '../../components/blog/Card';
import { APP_NAME, DOMAIN, FB_APP_ID } from '../../config';
import { CategoryBtn, TagBtn, SecondaryButton } from '../../components/Button';

const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogsSkip, router }) => {
  const head = () => (
    <Head>
      <title>Programming blogs | {APP_NAME}</title>
      <meta name="description" content="Programming blogs and tutorials on react, node, next, vue, php, laravel and web development" />

      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta property="og:title" content={`Latest web development tutorials | ${APP_NAME}`} />
      <meta property="og:description" content="Programming blogs and tutorials on react, node, next, vue, php, laravel and web development" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={APP_NAME} />

      <meta property="og:image" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/images/seoImage.png`} />
      <meta property="og:image:type" content="image/png" />
      <meta name="robots" content="index,follow" />
      {/* TODO: <meta property="fb:app_id" content={FB_APP_ID} /> */}
    </Head>
  );

  // state
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(blogsSkip);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState(blogs);

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
      if (data.error) {
        console.log(error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  }

  const loadMoreBtn = () => (
    size > 0 && size >= limit && <SecondaryButton onClick={loadMore}>Load more</SecondaryButton>
  )

  const showLoadedBlogs = () => (
    loadedBlogs.map((blog, i) => (
      <article className="my-3">
        <Card blog={blog} />
      </article>
    ))
  );

  const showAllCategories = () => (
    categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i}>
        <CategoryBtn className="ml-2"># {c.name}</CategoryBtn>
      </Link>
    ))
  );


  return (
    <>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-5 pb-3">
                <h1 className="font-weight-bold text-center">Browse on what you're interested in</h1>
              </div>
              <section className="text-center">
                <div className="my-4 pb-5 border-bottom">{showAllCategories()}</div>
              </section>
            </header>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-8 offset-md-2">
                {showLoadedBlogs()}
                <div className="text-center py-5">
                  {loadMoreBtn()}
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

//ssr this page
Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      const { blogs, categories, size} = data;
      return {
        blogs, categories, totalBlogs: size, blogsLimit: limit, blogsSkip: skip
      };
    }
  });
}

export default withRouter(Blogs);