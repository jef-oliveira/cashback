import logo from './logo.png';
import './styles.css';

function Header({ className, ...props }) {
  return (
    <header className={`header${className ? ` ${className}` : ''}`} { ...props }>
      <div className="gradient" />
      <img src={logo} className="logo" alt="Escudo Geek" />
    </header>
  );
}

export default Header;
