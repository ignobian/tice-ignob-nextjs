import { useEffect, useState } from "react";
import { getCommentsForBlog, createComment } from '../../actions/blog';
import { Col, Form, Input, FormGroup } from "reactstrap";
import { Image, Transformation} from 'cloudinary-react';
import { DefaultLink } from "../Link";
import { SecondaryButton } from "../Button";
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from "../../actions/auth";

const BlogComments = ({ blog }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    getCommentsForBlog(blog.slug).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setComments(data);
      }
    });
  }, []);

  const token = getCookie('token');

  const handleSubmit = e => {
    e.preventDefault();
    // redirect if not logged in
    if (!token) {
      Router.push('/signin');
    } else {
      createComment(blog.id, content, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setContent('');
          getCommentsForBlog(blog.slug).then(data => {
            setComments(data);
          });
        }
      });
    }
  }

  const showCommentList = () => (
    comments.map(comment => (
      <div key={comment.id} className="text-left border-bottom pb-3 mb-3">
        <p className="text-muted font-italic">{comment.content}</p>
        <div className="d-flex align-items-center">
          {comment.user.photo && (
            <Image publicId={comment.user.photo && comment.user.photo.key} style={{width: 50, borderRadius: '50%'}}>
              <Transformation width="100" crop="fill" />
            </Image>
          )}

          <Link href={`/profile/${comment.user.username}`}><DefaultLink>{comment.user.username}</DefaultLink></Link>
        </div>
      </div>
    ))
  )

  const showCommentForm = () => (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input value={content} onChange={e => setContent(e.target.value)} type="textarea" id="comment" placeholder="write a comment..." />
      </FormGroup>

      <FormGroup className="d-flex">
        <SecondaryButton type="submit">Post</SecondaryButton>
      </FormGroup>
    </Form>
  )

  return (
    <Col xs="12">
      <h4 className="my-3">Comments</h4>
      {showCommentList()}
      {showCommentForm()}
    </Col>
  )
}

export default BlogComments;
