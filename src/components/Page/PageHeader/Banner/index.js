import Header from '../Header';
import logo from './logo.png';
import './styles.scss';

function Banner({ className, ...props }) {
  return (
    <Header className={`banner${className ? ` ${className}` : ''}`} { ...props }>
      <img src={logo} className="logo" alt="Escudo GEEK" />
    </Header>
  );
}

export default Banner;
