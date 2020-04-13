import styled from 'styled-components';
import Link from 'next/link';
import { DefaultLink, LinkBtn } from '../Link';
import { isAuth, signout } from '../../actions/auth';
import Router from 'next/router';
import { NoButton } from '../Button';

const Container = styled.div`
  width: 200px;
  background-color: white;
  z-index: 2;
  border-radius: 5px;
  padding: 18px;
  position: absolute;
  right: 10px;
  border: 1px solid #cdcdcd;
  margin-top: 10px;
  li {
    opacity: 0.8;
    margin-bottom: 15px;
  }
`;

const DropdownMenu = () => {
  return (
    <Container>
      <ul>
        <li style={{color: '#111'}} className="border-bottom pb-3">Welcome {isAuth() ? isAuth().name: ''}</li>
        {isAuth() && isAuth().role === 1 && (
          <>
            <li><Link href="/admin/dashboard"><DefaultLink>Admin dashboard</DefaultLink></Link></li>
            <li><Link href="/admin/category"><DefaultLink>Manage Categories</DefaultLink></Link></li>
            <li className="border-bottom pb-3"><Link href="/admin/reports"><DefaultLink>Manage Reports</DefaultLink></Link></li>
          </>
        )} 
        <li><Link href="/blogs"><DefaultLink>Browse blogs</DefaultLink></Link></li>
        <li className="border-bottom pb-3"><Link href="/following"><DefaultLink>Following feed</DefaultLink></Link></li>
        <li><DefaultLink href="/blogs/new">Create blog</DefaultLink></li>
        <li><Link href="/user/blogs"><DefaultLink>Manage my blogs</DefaultLink></Link></li>
        <li><Link href="/user/followers"><DefaultLink>My Followers</DefaultLink></Link></li>
        <li className="border-bottom pb-3"><Link href="/user/stats"><DefaultLink>My Stats</DefaultLink></Link></li>
        <li className="border-bottom pb-3"><Link href="/user/update"><DefaultLink>Update profile</DefaultLink></Link></li>
        <li><NoButton className="p-0" onClick={() => signout(() => Router.push(`/`))}>Sign out</NoButton></li>
      </ul>
    </Container>
  )
}

export default DropdownMenu;
