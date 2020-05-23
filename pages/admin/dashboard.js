import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUsers } from '../../actions/user';
import { getReports } from '../../actions/report';
import { ClapImg } from '../../components/ClapImg';
import { getCookie } from '../../actions/auth';
import { APP_NAME } from '../../config';
import sortBy from 'sort-by';
import { SecondaryButtonLink } from '../../components/Button';
import AdminSearchBlogs from '../../components/admin/AdminSearchBlogs';
import { DisplaySmallerThanLg } from '../../components/responsive/Display';
import Admin from '../../components/auth/Admin';
import { Container, Row, Col, Table, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import capitalize from 'capitalize';

const Dashboard = () => {
  const head = () => (
    <Head>
      <title>Admin dashboard - {APP_NAME}</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
  )

  const orderOptions = ['claps', 'blogs', 'impressions', 'shares', 'username']
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    selectedOrderOption: '-claps',
    users: [],
    reports: [],
  });

  const { users, reports, selectedOrderOption } = values;

  const token = getCookie('token');

  const loadUsers = async () => {
    let data = await getUsers(token);

    if (data.error) return setError(data.error);

    const users = data;
    data = await getReports(token);

    if (data.error) return setError(data.error);

    setValues({ ...values, users, reports: data });
  }
  
  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = e => {
    const sortTerm = e.target.value === 'username' ? e.target.value : '-' + e.target.value
    setValues({ ...values, error: '', selectedOrderOption: sortTerm });
  }

  const showOptionSelect = () => (
    <div style={{display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center'}} className="my-3">
      <Label htmlFor="order">Order by</Label>
      <Input type="select" onChange={handleChange} id="order">
        {orderOptions.map((name, i) => (
          <option value={name}>{capitalize(name)}</option>
        ))}
      </Input>
    </div>
  )

  const showUsersTable = () => {
    // sort oppositely when selecting claps, impressions, shares or blogs (from big to small) otherwise from small to big (a-z)
    const orderedUsers = users.sort(sortBy(selectedOrderOption));
    
    return (
      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Full name</th>
            <th><ClapImg src="/images/clap.svg" alt="claps" /></th>
            <th><FontAwesomeIcon width="20" icon={['far', 'eye']} /></th>
            <th><FontAwesomeIcon width="16" icon={['fas', 'share-alt']} /></th>
            <th>Amount of blogs</th>
            <th></th>
          </tr>
  
          {orderedUsers.map((user, i) => (
            <tr key={i}>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.claps}</td>
              <td>{user.impressions}</td>
              <td>{user.shares}</td>
              <td>{user.blogs.length}</td>
              <td><Link href={`/profile/${user.username}`}><SecondaryButtonLink>View</SecondaryButtonLink></Link></td>
            </tr>
          ))}
  
        </thead>
      </Table>
    );
  }

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
        <Container>
          <Row>
            <Col xs="12" className="mt-4">
              <h2>Admin dashboard</h2>
            </Col>

            <Col xs="12" lg="6" className="mt-4">
            
              <h3>All users</h3>

              {showError()}

              {showOptionSelect()}

              <div style={{overflowX: 'scroll'}}>
                {showUsersTable()}
              </div>


              <hr/>
              <div className="my-3">
                <h3 className="mb-3">Reports</h3>
                <p>Total: {reports.length}</p>
                <Link href="/admin/reports"><SecondaryButtonLink>Manage</SecondaryButtonLink></Link>
              </div>


            </Col>

            <Col xs="12" lg="6" className="mt-4">

              <DisplaySmallerThanLg>
                <div className="mb-5">
                  <hr/>
                </div>
              </DisplaySmallerThanLg>

              {showAdminSearchBlogs()}

            </Col>
          </Row>
        </Container>
      </Layout>
    </Admin>
  );
}

export default Dashboard;

