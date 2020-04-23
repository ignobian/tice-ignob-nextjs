import { useState, useEffect } from 'react';
import Private from '../../components/auth/Private';
import Layout from '../../components/Layout';
import { Container, Row, Col, Table, Input, Label } from 'reactstrap';
import styled from 'styled-components';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { isAuth, getCookie } from '../../actions/auth';
import { loadUserStats } from '../../actions/user';
import { API } from '../../config';
import { DefaultLink } from '../../components/Link';
import Link from 'next/link';
import sortBy from 'sort-by';
import { Image, Transformation } from 'cloudinary-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GridContainer = styled.div`
  display: grid;

`;

const UserStats = () => {
  const sortOptions = ['Impressions', 'Shares'];

  const [values, setValues] = useState({
    stats: null,
    blogs: [],
    loading: true,
    error: '',
    sortMethod: 'Impressions'
  });

  const { loading, stats, blogs, error, sortMethod } = values;

  const token = isAuth() && getCookie('token');

  useEffect(() => {
    loadUserStats(token).then(data => {
      if (data.error) {
        setValues({ ...values, loading: false, error: data.error });
      } else {
        setValues({ ...values, loading: false, stats: data.stats, blogs: data.blogs });
      }
    });
  }, []);

  const handleSort = e => {
    setValues({ ...values, sortMethod: e.target.value });
  }

  const showLoading = () => loading && <Loading />
  const showError = () => error && <Error content={error} />

  const listBlogs = () => {
    let blogsSorted;
    if (sortMethod === 'Impressions') {
      // order by impressions length and then shares length
      blogsSorted = blogs.sort(sortBy('-impressionsLength', '-sharesLength'));
    } else {
      blogsSorted = blogs.sort(sortBy('-sharesLength', '-impressionsLength'));
    }

    return (
      blogsSorted.map(blog => (
        <tr>
          <td><Image width="40" style={{borderRadius: 4}} publicId={blog.photo && blog.photo.key}><Transformation crop="fill" width="200" /></Image></td>
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
              {stats && (
                <GridContainer>
                  <p>Total blogs: {blogs.length}</p>
                  <p>Total impressions: {stats.totalViews}</p>
                  <p>Total shares: {stats.totalShares}</p>
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
              {blogs && (
                <Table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Title</th>
                      <th><FontAwesomeIcon width="20" icon={['far', 'eye']} /></th>
                      <th><FontAwesomeIcon style={{marginLeft: 2}} width="14" icon={['fas', 'share-alt']} /></th>
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
