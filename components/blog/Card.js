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
      <Link key={i} href={`/categories/${category.slug}`}>
        <SmallCategoryBtn># {category.name}</SmallCategoryBtn>
      </Link>
    ))
  )

  const showTags = blog => (
    blog.tags.map((tag, i) => (
      <Link key={i} href={`/tags/${tag.slug}`}>
        <SmallTagBtn>{tag.name}</SmallTagBtn>
      </Link>
    ))
  )

  return (
    <div className="border-bottom mt-4 pb-5 d-flex">
      <div>
        <img className="mr-3" width="120" src={`${API}/blog/photo/${blog.slug}`} alt=""/>
      </div>
      <div>
        <h5>{blog.title}</h5>
        <p className="m-0">{blog.mdesc}...</p>
        <p className="text-muted py-2">
          <small>Posted by {blog.postedBy.username} | {moment(blog.updatedAt).fromNow()}</small>
          <span className="ml-3 mr-2">{blog.claps.length}</span>
          <img width="27" src="/images/clap.svg" alt="claps"/>
        </p>
        <div className="pb-2">
          {showCategories(blog)}
          {showTags(blog)}
        </div>
        <div className="mt-4">
          <Link href={`/blogs/${blog.slug}`}>
            <ButtonOutlineLink>Read more</ButtonOutlineLink>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;