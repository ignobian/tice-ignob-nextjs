import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';
import moment from 'moment';
import sortBy from 'sort-by';
import SmallCardUpdateDelete from '../blog/SmallCardUpdateDelete';

const BlogRead = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const token = getCookie('token');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data.sort(sortBy('-updatedAt')));
      }
    });
  }

  const showAllBlogs = () => (
    blogs.map((blog, i) => (
      <SmallCardUpdateDelete key={i} blog={blog}/>
    ))
  )

  const showMessage = () => (
    message && <div className="alert alert-success">{message}</div>
  )

  return (
    <>
      {showMessage()}
      {showAllBlogs()}
    </>
  );
}

export default BlogRead;