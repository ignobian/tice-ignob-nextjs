import Layout from "../components/Layout";
import Head from 'next/head';
import Link from 'next/link';
import { APP_NAME, DOMAIN } from '../config';
import CategoryListSection from '../components/home/CategoryListSection';
// import TagListSection from '../components/home/TagListSection';
import { getCategories } from "../actions/category";
import { getFeaturedTags } from "../actions/tag";
import { ButtonLink } from '../components/Button';
import { DefaultLink } from "../components/Link";
import FeaturedBlogs from '../components/home/FeaturedBlogs';
import { list } from "../actions/blog";
import { isAuth } from "../actions/auth";
import { H2 } from '../components/Typography';
import { Container, Row, Col } from 'reactstrap';

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
      <meta name="robots" content="index,follow" />
    </Head>
  );

  const showLearnMore = () => (
    <Col xs={{size: 6, offset: 3}} md={{size: 4, offset: 4}} className="mt-2">
      <ButtonLink style={{display: 'block', padding: '17px'}}>Get started</ButtonLink>

      <div className="mt-3 text-left" style={{opacity: 0.8}}>
        <p className="mb-2">Already have an account?</p>
        <Link href="/"><DefaultLink>Sign in</DefaultLink></Link>
      </div>
    </Col>
  )

  return (
    <>
      {head()}
      <Layout>
        <Container>
          <Row className="text-center">
            <Col xs="12" className="mt-5">
              <H2 className="font-weight-bold">Get to know about what matters to you.</H2>
            </Col>

            <Col xs="12" className="my-5">
              <CategoryListSection categories={categories}/>
            </Col>

            <Col xs="12" className="my-2">
              <p><strong>We are passionate about coding and are keen to share that knowledge with you</strong></p>
            </Col>

            {!isAuth() && showLearnMore()}

          </Row>

          <Row>
            <Col xs="12" md={{size: 10, offset: 1}} className="mt-4">
              <h2 className="pt-5">Featured blogs</h2>
              <FeaturedBlogs blogs={blogs}/>
            </Col>
          </Row>
        </Container>
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