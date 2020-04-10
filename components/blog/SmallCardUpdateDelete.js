import moment from 'moment';
import { isAuth, getCookie } from '../../actions/auth';
import { removeBlog } from '../../actions/blog';
import Link from 'next/link';
import styled from 'styled-components';
import { API } from '../../config';
import { useState } from 'react';
import { SecondaryButton, SecondaryButtonLink } from '../Button';
import { DisplaySm } from '../responsive/Display';

const GridContainer = styled.div`
  /* height: 70px; */
  padding: 20px;
  background-color: white;
  border-radius:10px;
  box-shadow: 1px 1px 5px rgba(0,0,0,.2);
  display: grid;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 180px;
  }
  align-items: center;
  transition: box-shadow 200ms ease-out;
  h5 {
    margin-top: 10px;
  }
  p {
    margin: 0;
  }
  &:hover {
    box-shadow: 1px 1px 7px rgba(0,0,0,.3);
  }
`;

const Img = styled.img`
  width: 70px;
  max-height: 60px;
  object-fit: contain;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const SmallCardUpdateDelete = ({ blog, onDelete }) => {

  const [isImage, setIsImage] = useState(true);

  // get the token
  const token = getCookie('token');

  const hideImage = () => {
    setIsImage(false);
  }

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Are you sure you want to delete this blog?');
    if (answer) {
      removeBlog(slug, token).then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          if (onDelete) onDelete();
        }
      });
    }
  }

  const showUpdateButton = blog => (
    <div className="my-1">
      <Link href={`/user/update/${blog.slug}`}>
        <SecondaryButtonLink>Update</SecondaryButtonLink>
      </Link>
    </div>
  )

  const showDeleteButton = blog => (
    <div className="my-1">
      <SecondaryButton style={{borderColor: 'red', color: 'red', padding: '4px 12px' }} onClick={() => deleteConfirm(blog.slug)} className="ml-2">Delete</SecondaryButton>
    </div>
  )

  return (
    <GridContainer>
      <div>
        {isImage && (
          <Link href={`/${blog.slug}`}>
            <Img src={`${API}/blog/photo/${blog.slug}`} onError={hideImage} alt=""/>
          </Link>
        )}

        <p><small>Published {moment(blog.updatedAt).fromNow()}</small></p>

        <Link href={`/${blog.slug}`}><h5 style={{cursor: 'pointer'}}>{blog.title}</h5></Link>
      </div>

      <div className="d-flex flex-wrap align-items-center justify-content-end">
        {showUpdateButton(blog)}
        {showDeleteButton(blog)}
      </div>
    </GridContainer>
  );
}

export default SmallCardUpdateDelete;