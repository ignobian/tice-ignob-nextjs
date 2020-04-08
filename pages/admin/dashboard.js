import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUsers } from '../../actions/user';
import { ClapImg } from '../../components/ClapImg';
import { getCookie } from '../../actions/auth';
import { APP_NAME } from '../../config';
import sortBy from 'sort-by';
import { SecondaryButtonLink } from '../../components/Button';
import AdminSearchBlogs from '../../components/admin/AdminSearchBlogs';
import { DisplaySmallerThanLg } from '../../components/responsive/Display';
import Admin from '../../components/auth/Admin';

const Dashboard = () => {

  const head = () => (
    <Head>
      <title>Admin dashboard - {APP_NAME}</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
  )

  const [values, setValues] = useState({
    error: '',
    users: [],
    orderOptions: ['claps', 'blogs', 'name']
  });

  const { error, users, orderOptions } = values;

  const token = getCookie('token');

  const loadUsers = () => {
    getUsers(token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: '', users: data.sort(sortBy('-claps')) });
      }
    });
  }
  
  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = e => {
    // sort oppositely when selecting claps or blogs (from big to small) otherwise from small to big (a-z)
    const sortTerm = e.target.value === 'name' ? e.target.name : '-' + e.target.value
    const newArr = users.sort(sortBy(sortTerm));
    setValues({ ...values, error: '', users: newArr });
  }

  const showOptionSelect = () => (
    <div className="d-flex align-items-center justify-content-end pr-5">
      <label htmlFor="order">Order by</label>
      <select onChange={handleChange} style={{display: 'inline-block', width: 'auto'}} className="ml-2 mb-2 form-control" id="order">
        {orderOptions.map((name, i) => (
          <option value={name}>{name}</option>
        ))}
      </select>
    </div>
  )

  const listUsers = () => (
    users.map((user, i) => (
      <tr key={i}>
        <td>{user.username}</td>
        <td>{user.name}</td>
        <td>{user.claps}</td>
        <td>{user.blogs.length}</td>
        <td><Link href={`/profile/${user.uniqueUsername}`}><SecondaryButtonLink>View profile</SecondaryButtonLink></Link></td>
      </tr>
    ))
  )

  const showUsersTable = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Full name</th>
          <th><ClapImg src="/images/clap.svg" alt="claps" /></th>
          <th>Amount of blogs</th>
          <th></th>
        </tr>

        {listUsers()}

      </thead>
    </table>
  );

  const showAdminSearchBlogs = () => (
    <div className="ml-md-4">
      <h3>Search blogs</h3>
      <AdminSearchBlogs/>
    </div>
  )

  const showError = () => error && <div className="alert alert-danger">{error}</div>

  return (
    <Admin>
      {head()}
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 mt-4">
              <h2>Admin dashboard</h2>
            </div>

            <div className="col-12 col-lg-6 mt-4">
            
              <h3>All users</h3>

              {showError()}

              {showOptionSelect()}

              {showUsersTable()}


            </div>

            <div className="col-lg-6 mt-4">

              <DisplaySmallerThanLg>
                <div className="mb-5">
                  <hr/>
                </div>
              </DisplaySmallerThanLg>

              {showAdminSearchBlogs()}

            </div>
          </div>
        </div>
      </Layout>
    </Admin>
  );
}

export default Dashboard;

