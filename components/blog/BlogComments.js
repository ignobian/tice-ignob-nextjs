import { useEffect, useState } from "react";
import { getCommentsForBlog } from '../../actions/blog';

const BlogComments = ({ blog }) => {
  const [comments, setComments] = useState([]);

  useEffect(async () => {
    const data = getCommentsForBlog(blog.slug);
    
    if (data.error) {
      console.log(data.error);
    } else {
      setComments(data);
    }
  }, []);

  return (
    <p>{JSON.stringify(comments)}</p>
  )
}

export default BlogComments;
