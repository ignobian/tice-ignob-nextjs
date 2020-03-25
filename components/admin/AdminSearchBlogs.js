import { useState } from 'react';
import { searchWithOption } from '../../actions/blog';
import { getCookie } from '../../actions/auth';
import SmallCardUpdateDelete from '../blog/SmallCardUpdateDelete';
import { SecondaryButton } from '../Button';

const AdminSearchBlogs = () => {

  const options = ['title', 'username', 'body'];

  const [values, setValues] = useState({
    error: '',
    loading: false,
    blogs: [],
    //TODO: noblogs will show a little message (no blogs found)
    noBlogs: false,
    query: '',
    option: 'title'
  });

  const { error, blogs, noBlogs, query, option, loading } = values;

  const token = getCookie('token');

  const handleChange = name => e => {
    setValues({ ...values, error: '', [name]: e.target.value, noBlogs: false });
  }

  const clearBlogsQuery = () => {
    setValues({ ...values, error: '', query: '', blogs: [], noBlogs: false, loading: false })
  }

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: '' });
    searchWithOption(query, token, option).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, blogs: [], noBlogs: false, loading: false })
      } else {
        setValues({ ...values, blogs: data, error: '', loading: false, noBlogs: data.length < 1 })
      }
    });
  }

  const showOptionSelect = () => (
    <select id="option" onChange={handleChange('option')} className="form-control" style={{ width: '70px' }}>
      {options.map((val, i) => (
        <option key={i} value={val}>{val}</option>
      ))}
    </select>
  )

  const showForm = () => (
    <div className="d-flex align-items-center justify-content-between">
      <form onSubmit={handleSubmit}>
        <input type="search" className="form-control" value={query} onChange={handleChange('query')} style={{display: 'inline-block', width: 'auto'}} />
        <SecondaryButton type="submit">Search</SecondaryButton>
      </form>
      <div className="d-flex align-items-center">
        <label className="mr-1 mb-0" htmlFor="option">Search by</label>
        {showOptionSelect()}
      </div>
    </div>
  );

  const showResults = () => (
    blogs.map((blog, i) => (
      <SmallCardUpdateDelete key={i} blog={blog} onDelete={clearBlogsQuery} />
    ))
  );

  const showLoading = () =>  loading && <p className="text-muted">Loading ...</p>
  const showError = () =>  error && <p className="alert alert-danger">{error}</p>
  const showNoBlogs = () =>  noBlogs && <p className="text-muted">No blogs found</p>

  return (
    <>
      <div className="mt-4 pb-2 border-bottom">
        {showForm()}
      </div>
      <div className="mt-4 mb-5">
        {showLoading()}
        {showError()}
        {showNoBlogs()}
        {showResults()}
      </div>
    </>
  )
};

export default AdminSearchBlogs;