import { Overlay, Icon } from 'components';

import './styles.scss';

function Loader({ message, className, ...props }) {
  return (
    <Overlay className={`loader${className ? ` ${className}` : ''}`} { ...props }>
      <Icon name="spinner" className="fa-spin" />
      {Boolean(message?.length) && <span>{message}</span>}
    </Overlay>
  );
}

export default Loader;
