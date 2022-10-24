import { useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Icon } from 'components';
import { useSession } from 'context';

import Header from '../Header';
import './styles.scss';

function NavBar({ className, ...props }) {
  const navigate = useNavigate();
  const { currentUser, signIn, signOut } = useSession();

  const handleSignOut = useCallback(async function() {
    await signOut();
    navigate('/');
  }, [signOut, navigate])

  return (
    <Header className={`navbar${className ? ` ${className}` : ''}`} { ...props }>
      <nav>
        <ul>
          <NavItem icon="home" title="Início" to="/" />
          <NavItem icon="search" title="Busca" />
          {Boolean(currentUser) && (
            <>
              {/*<NavItem icon="shopping-cart" title="Carrinho" />*/}
              <NavItem icon="heart" title="Lista de desejos" to="/wishlist" />
              <NavItem icon="user-circle" title="Minha conta" to="/account" />
              <NavItem icon="right-from-bracket" onClick={handleSignOut} title="Sair" />
            </>
          )}
          {!Boolean(currentUser) && (
            <>
              <NavItem icon="right-to-bracket" onClick={signIn} title="Entrar" />
            </>
          )}
        </ul>
      </nav>
    </Header>
  );
}

function NavItem({ icon, title, to, onClick }) {
  return(
    <li title={title}>
      <Link to={to} onClick={onClick}>
        <Icon name={icon} /><span> {title}</span>
      </Link>
    </li>
  );
}

export default NavBar;
