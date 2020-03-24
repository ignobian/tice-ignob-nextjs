import Header from './header/Header';
import theme from '../theme';
import { ThemeProvider } from 'styled-components';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header/>

      {children}
    </ThemeProvider>
  )
}

export default Layout;