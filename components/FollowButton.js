import { isAuth, getCookie } from '../actions/auth';
import { toggleFollower } from '../actions/user';
import { useState } from 'react';
import { SecondaryButton, NoButton } from './Button';
import { useEffect } from 'react';
import Router from 'next/router';

const FollowButton = ({ user, noborder }) => {
  const [values, setValues] = useState({
    userFollowers: user.followers.length,
    isFollowing: user.followers.includes(isAuth() && isAuth().id),
    isSelf: false
  });

  // check if user is self
  useEffect(() => {
    if (isAuth() && isAuth().id === user.id) {
      setValues({ ...values, isSelf: true });
    }
  }, [])

  const { userFollowers, isFollowing, isSelf } = values;

  const [followText, setFollowText] = useState(isFollowing ? 'Following' : 'Follow');

  const token = getCookie('token');

  const toggleHoverText = e => {
    if (e && (e.type === 'mouseenter')) {
      setFollowText(isFollowing ? 'Unfollow' : 'Follow');
    } else {
      setFollowText(isFollowing ? 'Following' : 'Follow');
    }
  }

  const onToggleFollower = () => {
    if (isAuth()) {
      toggleFollower(user.id, token).then(data => {
        if (data.error) {
          // need to sign in to perform this action
          console.log(data.error);
          // Router.push('/signin');
        } else {
          // increment/decrement the follower count by 1
          const crement = isFollowing ? -1 : 1
          // set the hovertext accordingly
          setFollowText(isFollowing ? 'Follow' : 'Following');
          // set the values accordingly
          setValues({ ...values, userFollowers: userFollowers + crement, isFollowing: !isFollowing });
        }
      });
    } else {
      Router.push('/signin?message=You\'re required to sign in for this action');
    }
  }

  if (noborder) return <NoButton disabled={isSelf} style={{opacity: (isFollowing || isSelf) ? 0.6 : 1 }} onMouseLeave={toggleHoverText} onMouseEnter={toggleHoverText} onClick={onToggleFollower}>{followText} ({userFollowers})</NoButton>

  return (
    <SecondaryButton disabled={isSelf} style={{opacity: (isFollowing || isSelf) ? 0.6 : 1 }} onMouseLeave={toggleHoverText} onMouseEnter={toggleHoverText} onClick={onToggleFollower}>{followText} ({userFollowers})</SecondaryButton>
  )
}

export default FollowButton;
