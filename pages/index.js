import Layout from "../components/Layout";
import Head from 'next/head';
import Link from 'next/link';
import { APP_NAME, DOMAIN } from '../config';
import CategoryListSection from '../components/home/CategoryListSection';
import TagListSection from '../components/home/TagListSection';
import { getCategories } from "../actions/category";
import { getFeaturedTags } from "../actions/tag";
import { ButtonLink } from '../components/Button';
import { DefaultLink } from "../components/Link";
import FeaturedBlogs from '../components/home/FeaturedBlogs';
import { list } from "../actions/blog";
import { isAuth } from "../actions/auth";

const Index = ({ categories, tags, blogs }) => {
  const head = () => (
    <Head>
      <title>Welcome to {APP_NAME} - blogs about tech</title>
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
    </Head>
  );

  return (
    <>
      {head()}
      <Layout>
        <div className="container">
          <div className="row text-center">
            <div className="col-12 mt-5">
              <h2 className="font-weight-bold" style={{fontSize: '2.9em'}}>Get to know about what matters to you.</h2>
            </div>

            <div className="col-12 my-5">
              <CategoryListSection categories={categories}/>
            </div>

            <div className="col-12">
              <TagListSection tags={tags} />
            </div>

            <div className="col-12 my-2">
              <p><strong>We are passionate about coding and are keen to share that knowledge with you</strong></p>
            </div>

            {!isAuth() && (
              <div className="col-6 offset-3 col-md-4 offset-md-4 mt-2">
                <ButtonLink style={{display: 'block', padding: '17px'}}>Get started</ButtonLink>

                <div className="mt-3 text-left" style={{opacity: 0.8}}>
                  <p className="mb-2">Already have an account?</p>
                  <Link href="/"><DefaultLink>Sign in</DefaultLink></Link>
                </div>
              </div>
            )}

          </div>

          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 mt-4">
              <h2 className="pt-5">Featured blogs</h2>
              <FeaturedBlogs blogs={blogs}/>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

// ssr categories, some featured blogs and more data
Index.getInitialProps = () => {
  return getCategories().then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      const categories = data;
      return getFeaturedTags().then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          const tags = data;
          return list().then(data => {
            if (data.error) {
              console.log(data.error);
            } else {
              return { categories, tags, blogs: data }
            }
          });
        }
      })
    }
  });
}

export default Index;