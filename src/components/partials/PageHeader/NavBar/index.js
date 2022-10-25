import { useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Icon } from 'components';
import { useSession } from 'context';

import Header from '../Header';
import './styles.scss';

function NavBar({ className, ...props }) {
  const { currentUser, signIn, signOut } = useSession();

  return (
    <Header className={`navbar${className ? ` ${className}` : ''}`} { ...props }>
      <nav>
        <ul>
          <NavItem icon="home" title="Início" to="/" />
          <NavItem icon="shopping-cart" title="Carrinho" to="/cart" />
          {Boolean(currentUser) && (
            <>
              {Boolean(currentUser?.admin) && (
                <>
                  <NavItem icon="coins" title="Clientes e cashback" to="/cashback" />
                  <NavItem icon="box" title="Estoque" to="/storage" />
                </>
              )}
              <NavItem icon="heart" title="Lista de desejos" to="/wishlist" />
              <NavItem icon="user-circle" title="Minha conta" to="/account" />
              <NavItem icon="right-from-bracket" onClick={signOut} title="Sair" />
            </>
          )}
          {!Boolean(currentUser) && (
            <NavItem icon="right-to-bracket" onClick={signIn} title="Entrar" />
          )}
        </ul>
      </nav>
    </Header>
  );
}

function NavItem({ icon, title, ...otherProps }) {
  return(
    <Link { ...otherProps }>
      <li>
          <Icon name={icon} /><span> {title}</span>
      </li>
    </Link>
  );
}

export default NavBar;
