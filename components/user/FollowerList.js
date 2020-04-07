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

const Li = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: 1px 1px 3px rgba(0,0,0,.2);
  border-radius: 5px;
  padding: 20px;
  h4 {
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
        <Avatar src={`${API}/user/photo/${follower.uniqueUsername}`} />
        <h4>{follower.username}</h4>
        <Link href={`/profile/${follower.uniqueUsername}`}><ButtonLink>View profile</ButtonLink></Link>
        <div className="ml-3">
          <FollowButton user={follower} />
        </div>
      </Li>
    ))
  )

  const showLoading = () => loading && <Loading />

  return (
    <>
      <h2 className="my-5">My Followers ({followers.length})</h2>
      <ul className="my-3">
        {showLoading()}
        {showFollowers()}
      </ul>
    </>
  )
}

export default FollowerList
