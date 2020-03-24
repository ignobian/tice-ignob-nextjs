import styled from 'styled-components';
import { API } from '../../config';
import Link from 'next/link';
import { ButtonOutlineLink, CategoryBtn } from '../Button';
import Card from '../blog/Card';

const FeaturedBlogs = ({ blogs }) => {

  const showCards = () => (
    blogs && blogs.map((blog, i) => (
      <Card blog={blog} key={i} />
    ))
  );

  return (
    <div className="mt-5">
      {showCards()}
    </div>
  )
}

export default FeaturedBlogs;