import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';

import Overlay from '../Overlay';

function Header({ message, className, ...props }) {
  return (
    <Overlay className={`loader${className ? ` ${className}` : ''}`} { ...props }>
      <FontAwesomeIcon icon={['fas', 'spinner']} className="fa-spin" />
      {Boolean(message?.length) && <span>{message}</span>}
    </Overlay>
  );
}

export default Header;
