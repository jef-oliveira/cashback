import { Icon } from 'components';

import Header from '../Header';
import './styles.scss';

function NavBar({ className, ...props }) {
  return (
    <Header className={`navbar${className ? ` ${className}` : ''}`} { ...props }>
      <nav>
        <ul>
          <NavItem icon="home" title="Início" />
          <NavItem icon="search" title="Busca" />
          <NavItem icon="heart" title="Lista de desejos" />
          <NavItem icon="shopping-cart" title="Carrinho" />
          <NavItem icon="user-circle" title="Minha conta" />
        </ul>
      </nav>
    </Header>
  );
}

function NavItem({ icon, title }) {
  return(
    <li title={title}>
      <a>
        <Icon name={icon} /><span> {title}</span>
      </a>
    </li>
  );
}

export default NavBar;
