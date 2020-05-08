import { API } from '../../config';
import stripHtml from 'string-strip-html';
import Link from 'next/link';
import moment from 'moment';
import { Image, Transformation} from 'cloudinary-react';
import { DefaultLink } from '../Link';

const RelatedBlog = ({ blog }) => (
  <>
    <div className="ui-card">
      <Link href={blog.slug}>
        <Image className="ui-card-featured-image" style={{width: '100%', cursor: 'pointer'}} publicId={blog.photo && blog.photo.key}>
          <Transformation width="300" crop="fill" />
        </Image>
      </Link>
      <div className="details pt-3">
        <Link href={blog.slug}><DefaultLink><h5>{blog.title}</h5></DefaultLink></Link>
        <p className="text-muted">{stripHtml(blog.excerpt).substring(0, 100)}...</p>
        <p>Created by <Link href={`/profile/${blog.user.username}`}><a>{blog.user.username}</a></Link> | Published {moment(blog.createdAt).fromNow()}</p>
        <Link href={`/${blog.slug}`}><DefaultLink className="btn-link">Read more</DefaultLink></Link>
      </div>
    </div>
    <style jsx>{`
      p, a {
        font-size: 16px;
        line-height: 1.6em;
        font-weight: normal;
      }
      .ui-card {
        text-align: left;
        margin-top: 20px;
        overflow: hidden;
        padding: 10px;
        width: 300px;
        border-radius: 5px;
        background-color: white;
        box-shadow: 1px 1px 10px rgba(0,0,0,.3);
        margin-right: 20px;
      }
      .ui-card-featured-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
    `}</style>
  </>
);

export default RelatedBlog;