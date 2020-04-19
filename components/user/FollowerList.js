import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { isAuth, getCookie } from '../../actions/auth';
import { getFollowers } from '../../actions/user';
import { Avatar } from '../Avatar';
import { API } from '../../config';
import { Button, ButtonLink } from '../Button';
import Loading from '../Loading';
import Link from 'next/link';
import FollowButton from '../FollowButton';
import { H2 } from '../Typography';
import { Row, Col } from 'reactstrap';
import { Image, Transformation } from 'cloudinary-react';

const Li = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: 1px 1px 3px rgba(0,0,0,.2);
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 10px;
  h5 {
    flex-grow: 1;
    margin-bottom: 0;
    margin-left: 15px;
  }
`;

const FollowerList = () => {
  const [values, setValues] = useState({
    loading: true,
    followers: []
  });

  const { loading, followers } = values;

  const token = isAuth() && getCookie('token');

  useEffect(() => {
    getFollowers(token).then(data => {
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, loading: false });
      } else {
        setValues({ ...values, followers: data, loading: false });
      }
    });
  }, []);

  const showFollowers = () => (
    followers.map(follower => (
      <Li>
        <Image style={{width: 20, height: 20, borderRadius: '50%'}} publicId={follower.photo && follower.photo.key}>
          <Transformation width="100" />
        </Image>
        <h5>{follower.username}</h5>
        <Row className="justify-content-end">
          <Col xs="12" md="6" className="d-flex justify-content-end">
            <Link href={`/profile/${follower.username}`}><ButtonLink>View profile</ButtonLink></Link>
          </Col>
          <Col xs="12" md="6" className="d-flex justify-content-end mt-2 mt-md-0">
            <FollowButton user={follower} />
          </Col>
        </Row>
      </Li>
    ))
  )

  const showLoading = () => loading && <Loading />

  return (
    <>
      <H2 className="my-5">My Followers ({followers.length})</H2>
      <ul className="my-3">
        {showLoading()}
        {showFollowers()}
      </ul>
    </>
  )
}

export default FollowerList
