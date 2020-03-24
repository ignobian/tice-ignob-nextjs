import { useState } from 'react';
import { APP_NAME, API } from '../../config';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { signout, isAuth } from '../../actions/auth';
// bring in the css from nprogress
import '../../node_modules/nprogress/nprogress.css';
import Search from '../blog/Search';
import DropdownMenu from './DropdownMenu';
import styled from 'styled-components';
import { ButtonLink, NoButton } from '../Button';
import { Avatar } from '../Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// display the progress bar at the top
Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

// styles
const Navbar = styled.nav`
  height: 70px;
  box-shadow: 0 1px 5px rgba(0,0,0,.2);
  background-color: #fdfdfd;
  padding: 0 15px;
  display: flex;
  align-items: center;
`;

const NavBrand = styled.h1`
  font-weight: bold;
  margin: 0;
  font-size: 1.2em;
  cursor: pointer;
  flex-grow: 1;
  color: ${props => props.theme.headingColor}!important;
`;

const NavLink = styled.a`
  margin: 0 10px;
`;

const NavButtonLink = styled(ButtonLink)`
  margin: 0 10px;
`;

const Loop = styled(NoButton)`
  margin-right: 7px;
`;

const Header = (props) => {
  const [isSearch, setIsSearch] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);

  const toggleSearch = () => setIsSearch(!isSearch);

  const toggleDropdown = () => setIsDropdown(!isDropdown);

  const setDefaultUrl = (e) => {
    e.target.src = '/images/default.png';
  }

  const searchBar = () => (
    isSearch ? (
      <Search/>
    ) : (
      <Loop onClick={toggleSearch}>
        <FontAwesomeIcon icon="search" height="14" color="#555"/>
      </Loop>
    )
  )

  const dropdownMenu = () => (
    isDropdown && (
      <DropdownMenu/>
    )
  )

  return (
    <>
      <Navbar>
        <Link href="/">
          <NavBrand>{APP_NAME}</NavBrand>
        </Link>

        {searchBar()}

        {!isAuth() && (
          <>
            <Link href="/signin"><NavLink>Sign in</NavLink></Link>
            <Link href="/signup"><NavButtonLink>Get started</NavButtonLink></Link>
          </>
        )}

        {isAuth() && (
          <Avatar src={`${API}/user/photo/${isAuth().uniqueUsername}`} onError={setDefaultUrl} alt="avatar" onClick={toggleDropdown} />
        )}

        </Navbar>

      {dropdownMenu()}

    </>
  );
}

export default Header;