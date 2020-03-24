import { useState, useEffect, createRef } from 'react';
import Router from 'next/router';

const Search = () => {
  const [query, setQuery] = useState('');

  const searchInput = createRef();

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    Router.push(`/search?query=${query}`)
  }

  const handleChange = e => {
    setQuery(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} style={{width: '150px'}} className="mr-2">
      <input 
        type="search" 
        className="form-control"
        placeholder="Search blogs"
        ref={searchInput}
        onChange={handleChange}
        value={query} />
    </form>
  )
}

export default Search;