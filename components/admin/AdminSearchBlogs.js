import { useState } from 'react';
import { searchWithOption } from '../../actions/blog';
import { getCookie } from '../../actions/auth';
import SmallCardUpdateDelete from '../blog/SmallCardUpdateDelete';
import { SecondaryButton } from '../Button';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import capitalize from 'capitalize';

const AdminSearchBlogs = () => {
  const options = ['title', 'username', 'body'];

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [values, setValues] = useState({
    query: '',
    selectedOption: options[0]
  });

  const { query, selectedOption } = values;

  const token = getCookie('token');

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  }

  const clearBlogsQuery = () => {
    setValues({ ...values, query: '' });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const data = await searchWithOption(query, token, selectedOption);

    setLoading(false);

    if (data.error) {
      setError(data.error);
      setBlogs([]);
    }

    setBlogs(data)
  }

  const showForm = () => (
      <Form onSubmit={handleSubmit}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 100px'}}>
          <Input type="search" value={query} onChange={handleChange('query')} />
          <SecondaryButton type="submit">Search</SecondaryButton>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center'}} className="mt-3">
          <Label className="mb-0" htmlFor="option">Search by</Label>

          <Input type="select" id="option" onChange={handleChange('selectedOption')} value={selectedOption}>
            {options.map(val => (
              <option key={val} value={val}>{capitalize(val)}</option>
            ))}
          </Input>
        </div>

      </Form>
  );

  const showResults = () => (
    blogs.map((blog, i) => (
      <SmallCardUpdateDelete key={i} blog={blog} onDelete={clearBlogsQuery} />
    ))
  );

  const showLoading = () =>  loading && <p className="text-muted font-italic">Loading ...</p>
  const showError = () =>  error && <Error content={error} />

  return (
    <>
      <div className="mt-4 pb-2 border-bottom">
        {showForm()}
      </div>
      <div className="mt-4 mb-5">
        {showLoading()}
        {showError()}
        {query && !blogs.length ? <p className="text-muted font-italic">No blogs found</p> : ''}
        {showResults()}
      </div>
    </>
  )
};

export default AdminSearchBlogs;