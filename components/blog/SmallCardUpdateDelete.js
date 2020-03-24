import moment from 'moment';
import { isAuth, getCookie } from '../../actions/auth';
import { removeBlog } from '../../actions/blog';
import Link from 'next/link';
import styled from 'styled-components';
import { API } from '../../config';
import { useState } from 'react';
import { SecondaryButton, SecondaryButtonLink } from '../Button';
import { DisplaySm } from '../responsive/Display';

const Container = styled.div`
  height: 70px;
  padding: 0 20px;
  background-color: white;
  border-radius: 50px;
  box-shadow: 1px 1px 5px rgba(0,0,0,.2);
  display: flex;
  align-items: center;
  transition: box-shadow 200ms ease-out;
  h4 {
    margin: 0;
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

const SmallCardUpdateDelete = ({ blog, loadBlogs }) => {

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
          loadBlogs();
        }
      });
    }
  }

  const showUpdateButton = blog => (
    <Link href={`/user/update/${blog.slug}`}>
      <SecondaryButtonLink>Update</SecondaryButtonLink>
    </Link>
  )

  const showDeleteButton = blog => (
    <SecondaryButton style={{borderColor: 'red', color: 'red', padding: '4px 12px'}} onClick={() => deleteConfirm(blog.slug)} className="ml-2">Delete</SecondaryButton>
  )

  return (
    <Container className="mt-2">
      {isImage && (
        <Link href={`/blogs/${blog.slug}`}>
          <Img src={`${API}/blog/photo/${blog.slug}`} onError={hideImage} alt=""/>
        </Link>
      )}

      <Link href={`/blogs/${blog.slug}`}><h4 className="flex-grow-1" style={{cursor: 'pointer'}}>{blog.title}</h4></Link>

      <DisplaySm>
        <div className="mr-2">
          <p><small>Published {moment(blog.updatedAt).fromNow()}</small></p>
        </div>
      </DisplaySm>


      <div className="buttons">
        {showUpdateButton(blog)}
        {showDeleteButton(blog)}
      </div>

    </Container>
  );
}

export default SmallCardUpdateDelete;