import { NavigationList } from 'components';
import { useSession } from 'context';

import Header from '../Header';
import './styles.scss';

function NavBar({ className, ...props }) {
  const { currentUser, signIn, signOut } = useSession();

  return (
    <Header className={`navbar${className ? ` ${className}` : ''}`} { ...props }>
      <NavigationList>
        {Boolean(currentUser?.admin) && (
          <NavigationList.Item icon="screwdriver-wrench" title="Configurações" to="/config" />
        )}
        <NavigationList.Item icon="home" title="Início" to="/" />
        <NavigationList.Item icon="shopping-cart" title="Carrinho" to="/cart" />
        {Boolean(currentUser) && (
          <>
            <NavigationList.Item icon="heart" title="Lista de desejos" to="/wishlist" />
            <NavigationList.Item icon="user-circle" title="Minha conta" to="/account" />
            <NavigationList.Item icon="right-from-bracket" onClick={signOut} title="Sair" />
          </>
        )}
        {!Boolean(currentUser) && (
          <NavigationList.Item icon="right-to-bracket" onClick={signIn} title="Entrar" />
        )}
      </NavigationList>
    </Header>
  );
}

export default NavBar;
