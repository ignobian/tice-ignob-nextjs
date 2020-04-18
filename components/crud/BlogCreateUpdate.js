import { useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import stripHtml from 'string-strip-html';
import { Input, Label, FormGroup, Form, Container, Row, Col } from 'reactstrap';
import { Image, Transformation } from 'cloudinary-react';

// components
import { Button, SecondaryButtonLabel } from '../Button';
import { DisplaySmallerThanMd } from '../responsive/Display';
import Chip from '../TagChip';

// actions
import { getCookie } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { createBlog, getBlog, updateBlog } from '../../actions/blog';

// import React Quill dynamically (only on the clientside)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// import configs for react quill
import { QuillModules, QuillFormats } from '../../helpers/quill';
// import css for react quill
import '../../node_modules/react-quill/dist/quill.snow.css';
import { API } from '../../config';
import Loading from '../Loading';

const CreateUpdateBlog = ({ slug }) => {
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

  const [checkedCategories, setCheckedCategories] = useState([]);
  
  const [title, setTitle] = useState(titleFromLS());
  const [body, setBody] = useState(blogFromLS());
  const [tags, setTags] = useState([]);

  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    loading: false,
    photo: '',
    photoPreview: '',
    cloudinaryPhoto: null,
    tagField: '',
    hidePublishButton: false,
    isEdit: false
  });

  const { error, tagField, sizeError, success, loading, hidePublishButton, cloudinaryPhoto, photo, photoPreview, isEdit } = values;
  const token = getCookie('token');

  useEffect(() => {
    // check if its an edit blog
    if (slug) {
      getBlog(slug).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          // populate state with all the values of blog
          initUpdateBlog(data);
        }
      })
    }
    initCategories();
  }, [slug]);

  const initUpdateBlog = blog => {
    setCheckedCategories(blog.categories);
    setTags(blog.tags.map(t => t.name));
    setTitle(blog.title);
    setBody(blog.body);
    setValues({...values, isEdit: true, cloudinaryPhoto: blog.photo || null });
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

  const handleSubmit = e => {
    e.preventDefault();
    // set loading to true
    setValues({ ...values, loading: true });
    // create the object
    const blog = {
      title,
      body,
      categories: checkedCategories.map(category => category.id),
      tags
    }
    if (photo) {
      blog.photo = photoPreview;
    }

    if (isEdit === false) {
      // publish the blog if create
      createBlog(blog, token).then(data => {
        if (data.error) {
          setValues({ ...values, loading: false, error: data.error });
        } else {
          setValues({ ...values, loading: false, error: '', success: `${data.title} is created!`});
          // redirect to the update page of this blog post
          Router.push(`/${data.slug}`);
        }
      });
    } else {
      // update blog
      updateBlog(blog, token, slug).then(data => {
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
        setValues({ ...values, photo: value, photoPreview: e.target.result, cloudinaryPhoto: null });
      }
      reader.readAsDataURL(value);
    }

    if (name === 'title') {
      setTitle(value);
      if (typeof window !== 'undefined') {
        localStorage.setItem('title', JSON.stringify(value))
      }
    } else if (name === 'tags') {
      handleTag(value);
    } else {
      setValues({ ...values, [name]: value, error: '' });
    }
  }

  const handleTag = (value) => {
    const typedCharacter = value.substring(value.length - 1);

    if (typedCharacter === ',') {
      const tag = value.substring(0, value.length - 1);
      setTags(tags.concat(tag));
      setValues({ ...values, tagField: '' });
    } else {
      setValues({ ...values, tagField: value });
    }
  }

  const removeTag = name => {
    setTags(tags.filter(t => t !== name));
  }
  
  const handleBody = e => {
    setBody(e);
    // set local storage when body is being typed
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
  }
  
  const handleCategory = category => {
    if (checkedCategories.includes(category)) {
      const categories = checkedCategories.filter(ccategory => ccategory !== category);
      setCheckedCategories(categories);
    } else {
      setCheckedCategories(checkedCategories.concat(category))
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
    <ul style={{maxHeight: '150px', overflowY: 'scroll', paddingLeft: 23}}>
      {categories && categories.map(category => (
        <li key={category.id}>
          <Input checked={checkedCategories.includes(category)} onChange={() => handleCategory(category)} id={category.name} type="checkbox" className="mr-2"/>
          <Label className="form-check-label" htmlFor={category.name}>{category.name}</Label>
        </li>
      ))}
    </ul>
  )

  const showTags = () => (
    <div className="d-flex flex-wrap my-3">
      {tags.map(tag => (
        <Chip onDelete={removeTag} className="mr-1">{tag}</Chip>
      ))}
    </div>
  )
    
  const showTagInput = () => (
    <Input 
      placeholder="Separate by comma"
      onChange={handleChange('tags')}
      value={tagField} />
  )

  const blogForm = () => {
    const titleMin = 49;
    const titleMax = 61;
    const titleCount = title.length;

    // for the body (based on words)
    const bodyWordMin = 300;
    const bodyWordCount = stripHtml(body || '').split(' ').length;

    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title" className="text-muted">Title</Label>
          <Row form className="align-items-center">
            <Col xs="11">
              <Input type="text" onChange={handleChange('title')} value={title} id="title" />
            </Col>
            <Col xs="1">
              <small style={{ color: (titleCount >= titleMin && titleCount <= titleMax) ? 'green' : 'red' }}>{titleCount}</small>
            </Col>
          </Row>
        </FormGroup>

        <FormGroup className="mb-1">
          <ReactQuill modules={QuillModules} formats={QuillFormats} value={body} placeholder="Write something..." onChange={handleBody} />
        </FormGroup>

        <div className="d-flex justify-content-end mb-3 w-100">
          <small style={{ color: (bodyWordCount >= bodyWordMin) ? 'green' : 'red' }}>{bodyWordCount}</small>
        </div>

        <FormGroup>
          <Button type="submit" >{isEdit ? 'Update' : 'Publish'}</Button>
        </FormGroup>
      </Form>
    )
  }

  const addFeaturedImage = () => (
    <FormGroup>
      <div className="featured-image-container">
        {showFeaturedImage()}
        {showCloudinaryImage()}
      </div>
      <small className="text-muted">Max size: 1mb</small><br/>
      <SecondaryButtonLabel htmlFor="photo">Upload featured image</SecondaryButtonLabel>
      <input id="photo" onChange={handleChange('photo')} type="file" accept="image/*" hidden />
    </FormGroup>
  )

  const showCloudinaryImage = () => (
    <Image publicId={cloudinaryPhoto && cloudinaryPhoto.key} height="100">
      <Transformation width="200" crop="fill" />
    </Image>
  )

  const showFeaturedImage = () => {
    const src = photoPreview ? photoPreview : `${API}/blog/photo/${slug}`;
    return (
      <img className="mb-2" height="100" src={src} alt=""/>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col xs="12" md="8">
          {blogForm()}
          {showSuccess()}
          {showError()}
          {showLoading()}
          <DisplaySmallerThanMd>
            <hr/>
          </DisplaySmallerThanMd>
        </Col>

        <Col xs="12" md="4">
          <h4>Featured image</h4>
          {addFeaturedImage()}
          <hr/>
          <h4>Categories</h4>
          {showCategories()}
          <hr/>
          <div className="mb-5">
            <h4>Tags</h4>
            {showTags()}
            {showTagInput()}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateUpdateBlog;