import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import HeaderActions from './HeaderActions';
const Header = () => {
  return (
    <header>
      <nav className="container">
        <div>
          <Link to="/">
            <img className="w-32" src={Logo} alt="lws" />
          </Link>
        </div>

        <div>
          <HeaderActions />
        </div>
      </nav>
    </header>
  );
};

export default Header;
