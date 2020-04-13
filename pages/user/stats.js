import { useState, useEffect } from 'react';
import Private from '../../components/auth/Private';
import Layout from '../../components/Layout';
import { Container, Row, Col, Table, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import { isAuth, getCookie } from '../../actions/auth';
import { loadUserStats } from '../../actions/user';
import { API } from '../../config';
import { DefaultLink } from '../../components/Link';
import Link from 'next/link';
import sortBy from 'sort-by';

const GridContainer = styled.div`
  display: grid;

`;

const UserStats = () => {
  const sortOptions = ['Impressions', 'Shares'];

  const [values, setValues] = useState({
    data: null,
    loading: true,
    error: '',
    sortMethod: 'Impressions'
  });

  const { loading, data, error, sortMethod } = values;

  const token = isAuth() && getCookie('token');

  useEffect(() => {
    loadUserStats(token).then(data => {
      if (data.error) {
        setValues({ ...values, loading: false, error: data.error });
      } else {
        setValues({ ...values, loading: false, data });
      }
    });
  }, []);

  const handleSort = e => {
    setValues({ ...values, sortMethod: e.target.value });
  }

  const showLoading = () => loading && <Loading />
  const showError = () => error && <p className="alert alert-danger">{error}</p>

  const listBlogs = () => {
    const blogsWithExtraData = data.blogs.map(blog => {
      blog.impressionsLength = blog.impressions.length;
      blog.sharesLength = blog.shares.length;
      return blog;
    });

    let blogsWithExtraDataSorted;
    if (sortMethod === 'Impressions') {
      // order by impressions length and then shares length
      blogsWithExtraDataSorted = blogsWithExtraData.sort(sortBy('-impressionsLength', '-sharesLength'));
    } else {
      blogsWithExtraDataSorted = blogsWithExtraData.sort(sortBy('-sharesLength', '-impressionsLength'));
    }

    return (
      blogsWithExtraDataSorted.map(blog => (
        <tr>
          <td><img width="40" style={{borderRadius: 4}} src={`${API}/blog/photo/${blog.slug}`} /></td>
          <td style={{maxWidth: 60, overflow: 'hidden'}}><Link href={`/${blog.slug}`}><DefaultLink>{blog.title}</DefaultLink></Link></td>
          <td>{blog.impressions.length}</td>
          <td>{blog.shares.length}</td>
        </tr>
      ))
    )
  }

  return (
    <Private>
      <Layout>
        {showLoading()}
        {showError()}
        <Container>
          <Row>
            <Col xs="12">
              <h3 className="my-4">My stats</h3>
            </Col>

            <Col xs="12">
              {data && (
                <GridContainer>
                  <p>Total impressions: {data.totalViews}</p>
                  <p>Total shares: {data.totalShares}</p>
                </GridContainer>
              )}
            </Col>

            <Col xs="12">
              <h4 className="my-4">Best performing blogs</h4>
            </Col>

            <Col xs="12" className="mb-2">

              <Label className="mr-2" htmlFor="sorting">Sort by</Label>
              <Input className="d-inline" id="sorting" style={{width: 'auto'}} type="select" onChange={handleSort}>
                {sortOptions.map(option => (
                  <option>{option}</option>
                ))}
              </Input>
            </Col>

            <Col xs="12">
              {data && (
                <Table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Title</th>
                      <th>Impressions</th>
                      <th>Shares</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listBlogs()}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </Container>
      </Layout>
    </Private>
  )
}

export default UserStats
