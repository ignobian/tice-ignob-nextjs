import { useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import dynamic from 'next/dynamic';

// components
import { Button, SecondaryButtonLabel } from '../Button';
import { DisplaySmallerThanMd } from '../responsive/Display';

// actions
import { getCookie } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog, getBlog, updateBlog } from '../../actions/blog';

// import React Quill dynamically (only on the clientside)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// import configs for react quill
import { QuillModules, QuillFormats } from '../../helpers/quill';
// import css for react quill
import '../../node_modules/react-quill/dist/quill.snow.css';
import { API } from '../../config';
import Loading from '../Loading';

const CreateUpdateBlog = ({ router }) => {
  // local storage fetching
  const titleFromLS = () => {
    if (typeof window === 'undefined') return '';
    if (localStorage.getItem('title')) {
      return JSON.parse(localStorage.getItem('title'));
    } else return '';
  }

  const blogFromLS = () => {
    if (typeof window === 'undefined') return false;
    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else return false;
  }

  // state
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [title, setTitle] = useState(titleFromLS());
  const [body, setBody] = useState(blogFromLS());

  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    loading: false,
    photo: '',
    photoPreview: '',
    hidePublishButton: false,
    isEdit: false,
    slug: ''
  });

  const { error, sizeError, success, loading, hidePublishButton, photo, photoPreview, isEdit, slug } = values;
  const token = getCookie('token');

  useEffect(() => {
    // check if its an edit blog
    if (router.query.slug) {
      getBlog(router.query.slug).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          // populate state with all the values of blog
          initUpdateBlog(data);
        }
      })
    }
    initCategories();
    initTags();
  }, [router]);

  const initUpdateBlog = (blog) => {
    setCheckedCategories(blog.categories.map(record => record._id));
    setCheckedTags(blog.tags.map(record => record._id));
    setTitle(blog.title);
    setBody(blog.body);
    setValues({...values, isEdit: true, slug: blog.slug});
  }

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  }

  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    // set loading to true
    setValues({ ...values, loading: true });
    // create the formdata object
    const data = new FormData();
    data.set('title', title);
    data.set('body', body);
    data.set('categories', checkedCategories);
    data.set('tags', checkedTags);
    if (photo) {
      data.set('photo', photo);
    }

    if (isEdit === false) {
      // publish the blog if create
      createBlog(data, token).then(data => {
        if (data.error) {
          setValues({ ...values, loading: false, error: data.error });
        } else {
          setValues({ ...values, loading: false, error: '', success: `${data.title} is created!`, photo: '', photoPreview: ''});
          setTitle('');
          setBody('');
          // clear the title in the local storage
          clearStorage('title');
          // redirect to the update page of this blog post
          Router.push(`/blogs/${data.slug}`);
        }
      });
    } else {
      // update blog
      updateBlog(data, token, slug).then(data => {
        if (data.error) {
          setValues({ ...values, loading: false, error: data.error });
        } else {
          setValues({ ...values, loading: false, error: '', success: 'Succesfully updated', photoPreview: '' });
        }
      });
    }
  }
  
  const handleChange = name => e => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    if (name === 'photo') {
      // make an image preview
      const reader = new FileReader();

      reader.onload = (e) => {
        setValues({ ...values, photo: value, photoPreview: e.target.result });
      }
      reader.readAsDataURL(value);
    }

    if (name === 'title') {
      setTitle(value);
      if (typeof window !== 'undefined') {
        localStorage.setItem('title', JSON.stringify(value))
      }
    } else {
      setValues({
        ...values,
        [name]: value,
        error: ''
      });
    }
  }
  
  const handleBody = e => {
    setBody(e);
    // set local storage when body is being typed
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
  }
  
  const handleToggle = (id, option) => {
    // clear previous error
    setValues({ ...values, error: '' });
    if (option === 'category') {
      // handle category change
      const clickedCategory = checkedCategories.indexOf(id);
      const all = [...checkedCategories]
      // check if it didnt find
      if (clickedCategory === -1) {
        // if not, then push into state
        all.push(id);
      } else {
        // if so, then remove from state
        all.splice(clickedCategory, 1);
      }
      setCheckedCategories(all);
    } else {
      // handle tag change
      const clickedTag = checkedTags.indexOf(id);
      const all = [...checkedTags]
      // check if it didnt find
      if (clickedTag === -1) {
        // if not, then push into state
        all.push(id);
      } else {
        // if so, then remove from state
        all.splice(clickedTag, 1);
      }
      setCheckedTags(all);
    }
  }

  // check if category/tag is in array of state
  const isInState = (id, option) => {
    if (option === 'category') {
      return checkedCategories.includes(id);
    } else {
      return checkedTags.includes(id);
    }
  }
  
  // storage
  const clearStorage = key => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, '');
    }
  }

  const showLoading = () => loading && <Loading/>
  const showError = () => error && <p className="alert alert-danger">{error}</p>;
  const showSuccess = () => success && <p className="alert alert-success">{success}</p>;
  
  const showCategories = () => (
    <ul style={{maxHeight: '150px', overflowY: 'scroll'}}>
      {categories && categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input checked={isInState(c._id, 'category')} onChange={() => handleToggle(c._id, 'category')} id={c.name} type="checkbox" className="mr-2"/>
          <label className="form-check-label" htmlFor={c.name}>{c.name}</label>
        </li>
      ))}
    </ul>
  )

  const showTags = () => (
    <ul style={{maxHeight: '150px', overflowY: 'scroll'}}>
      {tags && tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input checked={isInState(t._id, 'tag')} onChange={() => handleToggle(t._id, 'tag')} id={t.name} type="checkbox" className="mr-2"/>
          <label className="form-check-label" htmlFor={t.name}>{t.name}</label>
        </li>
      ))}
    </ul>
  )

  const blogForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title" className="text-muted">Title</label>
        <input type="text" className="form-control" onChange={handleChange('title')} value={title} id="title" />
      </div>

      <div className="form-group">
        <ReactQuill modules={QuillModules} formats={QuillFormats} value={body} placeholder="Write something..." onChange={handleBody} />
      </div>

      <div className="form-group">
        <Button type="submit" >{isEdit ? 'Update' : 'Publish'}</Button>
      </div>
    </form>
  );

  const addFeaturedImage = () => (
    <div className="form-group">
      <div className="featured-image-container">
        {showFeaturedImage()}
      </div>
      <small className="text-muted">Max size: 1mb</small><br/>
      <SecondaryButtonLabel htmlFor="photo">Upload featured image</SecondaryButtonLabel>
      <input id="photo" onChange={handleChange('photo')} type="file" accept="image/*" hidden />
    </div>
  )

  const showFeaturedImage = () => {
    const src = photoPreview ? photoPreview : `${API}/blog/photo/${slug}`;
    return (
      <img width="100" height="100" src={src} alt=""/>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-8">
          {blogForm()}
          {showSuccess()}
          {showError()}
          {showLoading()}
          <DisplaySmallerThanMd>
            <hr/>
          </DisplaySmallerThanMd>
        </div>

        <div className="col-12 col-md-4">
          <h4>Featured image</h4>
          {addFeaturedImage()}
          <hr/>
          <h4>Categories</h4>
          {showCategories()}
          <hr/>
          <h4>Tags</h4>
          {showTags()}
        </div>
      </div>
    </div>
  );
}

export default withRouter(CreateUpdateBlog);