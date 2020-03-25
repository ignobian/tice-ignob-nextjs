import Link from 'next/link';
import moment from 'moment';
import renderHTML from 'react-render-html';
import { API } from '../../config';
import { ButtonOutlineLink, CategoryBtn, TagBtn } from '../Button';
import styled from 'styled-components';
import { ClapImg } from '../ClapImg';

const SmallCategoryBtn = styled(CategoryBtn)`
  font-size: 15px;
  margin: 0;
  margin-right: 10px;
`;

const SmallTagBtn = styled(TagBtn)`
  font-size: 15px;
  margin: 0;
  margin-right: 5px;
`;

const Card = ({ blog }) => {
  const showCategories = blog => (
    blog.categories.map((category, i) => (
      <div className="my-3">
        <Link key={i} href={`/categories/${category.slug}`}>
          <SmallCategoryBtn># {category.name}</SmallCategoryBtn>
        </Link>
      </div>
    ))
  )

  const showTags = blog => (
    blog.tags.map((tag, i) => (
      <div className="my-3">
        <Link key={i} href={`/tags/${tag.slug}`}>
          <SmallTagBtn>{tag.name}</SmallTagBtn>
        </Link>
      </div>
    ))
  )

  return (
    <div className="border-bottom mt-4 pb-5 d-flex" style={{overflow: 'hidden'}}>
      <div>
        <img className="mr-3" width="120" src={`${API}/blog/photo/${blog.slug}`} alt=""/>
      </div>
      <div>
        <Link href={`/${blog.slug}`}><h5 style={{ cursor: 'pointer' }}>{blog.title}</h5></Link>
        <p className="m-0">{blog.mdesc}...</p>
        <p className="text-muted pt-2 mb-1">
          <small>Posted by {blog.postedBy.username} | {moment(blog.updatedAt).fromNow()}</small>
          <span className="ml-3 mr-2">{blog.claps.length}</span>
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
    </div>
  );
}

export default Card;