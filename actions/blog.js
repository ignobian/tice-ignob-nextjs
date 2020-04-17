import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { handleResponse } from './auth';

export const createBlog = (blog, token) => {
  return fetch(`${API}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(blog)
  })
  .then(res => {
    handleResponse(res);
    return res.json();
  })
  .catch(err => console.log(err));
};

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  return fetch(`${API}/blogs-categories-tags`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ skip, limit })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const getBlog = slug => {
  return fetch(`${API}/blogs/${slug}`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const listRelated = (blog) => {
  return fetch(`${API}/blogs/related`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({blog})
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

export const list = () => {
  return fetch(`${API}/blogs`)
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const removeBlog = (slug, token) => {
  return fetch(`${API}/blog/${slug}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => () => {
    handleResponse(res)
    return res.json()
  })
  .catch(err => console.log(err));
};

export const updateBlog = (blog, token, slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: blog
  })
  .then(res => () => {
    handleResponse(res);
    return res.json();
  })
  .catch(err => console.log(err));
};

export const listSearch = (params) => {
  let query = queryString.stringify({search: params});

  return fetch(`${API}/blogs/search?${query}`)
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const listFromUser = token => {
  return fetch(`${API}/user/blogs`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const addClap = (blog, user) => {
  if (user) {
    return fetch(`${API}/blog/${blog.slug}/add-clap`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: user._id })
    })
    .then(res => res.json())
    .catch(err => console.log(err))
  }
}

export const searchWithOption = (query, token, option) => {
  return fetch(`${API}/blogs/advanced-search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ query, option })
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export const getFeedBlogs = token => {
  return fetch(`${API}/blogs/feed`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}