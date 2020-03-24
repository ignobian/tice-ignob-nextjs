import { useState, useEffect } from 'react';
import { getCookie } from '../../actions/auth';
import { createCategory, getCategories, removeCategory } from '../../actions/category';
import { Button, CategoryBtn } from '../Button';

const Category = () => {
  const [ values, setValues ] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false
  });

  const { name, error, success, categories, removed, reload } = values;
  // get token from the cookie
  const token = getCookie('token');

  // fetch all categories on page load
  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  }

  const showCategories = () => categories.map((c, i) => (
    <CategoryBtn
      title="Double click to delete"
      onDoubleClick={() => deleteConfirm(c.slug)}
      key={i}>
        # {c.name}
      </CategoryBtn>
  ));

  const deleteConfirm = slug => {
    let answer = window.confirm('Are you sure you want to delete this category?');
    if (answer) deleteCategory(slug);
  }

  const deleteCategory = slug => {
    removeCategory(slug, token).then(data => {
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

  // create category in the database
  const handleSubmit = e => {
    e.preventDefault();
    createCategory({ name }, token).then(data => {
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
  
  const showSuccess = () => success && <p className="text-success">Category is created</p>

  const showError = () => error && <p className="text-danger">{error}</p>

  const showRemoved = () => removed && <p className="text-danger">Category is removed</p>

  const newCategoryForm = () => (
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
        {newCategoryForm()}
        <div className="mt-5">
          {showCategories()}
        </div>
      </div>
    </>
  )
}

export default Category;