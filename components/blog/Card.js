import Link from 'next/link';
import moment from 'moment';
import { API } from '../../config';
import { ButtonOutlineLink, CategoryBtn, TagBtn, NoButton } from '../Button';
import styled from 'styled-components';
import { DefaultLink } from '../Link';
import FollowButton from '../FollowButton';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-bottom: 20px;
  margin-bottom: 30px;
  @media (min-width: 768px) {
    grid-template-columns: 170px 1fr;
  }
`;

const FeaturedImg = styled.img`
  height: 150px;
  width: 100%;
  object-fit: cover;
  margin-bottom: 10px;
  @media (min-width: 350px) {
    height: 200px;
  }
  @media (min-width: 768px) {
    height: auto;
    width: 100%;
    padding-right: 20px;
  }
`;

const SmallCategoryBtn = styled(CategoryBtn)`
  font-size: 15px;
  margin: 0;
  margin-right: 10px;
`;

const Card = ({ blog }) => {
  const followLink = () => (
    <FollowButton noborder user={blog.postedBy} />
  );

  const showCategories = blog => (
    blog.categories.map((category, i) => (
      <div key={i} className="my-3">
        <Link href={`/categories/${category.slug}`}>
          <SmallCategoryBtn># {category.name}</SmallCategoryBtn>
        </Link>
      </div>
    ))
  )

  const showTags = blog => (
    blog.tags.map((tag, i) => (
      <div key={i} className="my-3">
        <Link href={`/tags/${tag}`}>
          <TagBtn className="mr-2">{tag}</TagBtn>
        </Link>
      </div>
    ))
  )

  return (
    <GridContainer>
      <div>
        <Link href={`/${blog.slug}`}><DefaultLink><FeaturedImg src={`${API}/blog/photo/${blog.slug}`} alt={blog.title}/></DefaultLink></Link>
      </div>

      <div className="details">
        <Link href={`/${blog.slug}`}><h5 style={{ cursor: 'pointer' }}>{blog.title}</h5></Link>
        <p className="m-0" style={{overflow: 'hidden'}}>{blog.mdesc}...</p>
        <p className="text-muted pt-2 mb-1">
          <small>Posted by <Link href={`/profile/${blog.postedBy.uniqueUsername}`}><DefaultLink>{blog.postedBy.username}</DefaultLink></Link> | {followLink()} | {moment(blog.updatedAt).fromNow()}</small>
          <span className="ml-2 ml-sm-3 mr-2">{blog.claps.length}</span>
          <img width="27" src="/images/clap.svg" alt="claps"/>
        </p>
        <div className="d-flex flex-wrap">
          {showCategories(blog)}
          {showTags(blog)}
        </div>
        <div className="mt-4">
          <Link href={`/${blog.slug}`}>
            <ButtonOutlineLink>Read more</ButtonOutlineLink>
          </Link>
        </div>

      </div>


    </GridContainer>
  );
}

export default Card;