import { useState, useEffect } from 'react';
import { getCookie } from '../../actions/auth';
import { createTag, getTags, removeTag } from '../../actions/tag';
import { TagBtn, Button } from '../Button';

const Tag = () => {
  const [ values, setValues ] = useState({
    name: '',
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false
  });

  const { name, error, success, tags, removed, reload } = values;
  // get token from the cookie
  const token = getCookie('token');

  // fetch all categories on page load
  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  }

  const showTags = () => tags.map((t, i) => (
    <TagBtn 
      className="mr-2 mt-2"
      title="Double click to delete"
      onDoubleClick={() => deleteConfirm(t.slug)}
      key={i}>
        {t.name}
      </TagBtn>
  ));

  const deleteConfirm = slug => {
    let answer = window.confirm('Are you sure you want to delete this tag?');
    if (answer) deleteTag(slug);
  }

  const deleteTag = slug => {
    removeTag(slug, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: '',
          removed: !removed,
          reload: !reload
        });
      }
    });
  }

  // create tag in the database
  const handleSubmit = e => {
    e.preventDefault();
    createTag({ name }, token).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false
        });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: '',
          removed: false,
          reload: !reload
        });
      }
    });
  }

  const handleChange = e => {
    setValues({
      ...values,
      name: e.target.value
    });
  }
  
  const showSuccess = () => success && <p className="text-success">Tag is created</p>

  const showError = () => error && <p className="text-danger">{error}</p>

  const showRemoved = () => removed && <p className="text-danger">Tag is removed</p>

  const newTagForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted" htmlFor="name">Name</label>
        <input
          id="name"
          onChange={handleChange}
          value={name}
          required
          type="text"
          className="form-control"/>

      </div>

      <Button type="submit">Create</Button>
    </form>
  );

  return (
    <>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div>
        {newTagForm()}
        <div className="mt-5 d-flex flex-wrap">
          {showTags()}
        </div>
      </div>
    </>
  )
}

export default Tag;