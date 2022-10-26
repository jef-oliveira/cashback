import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Icon({ name, type = 'fas', className, ...props }) {
  return (
    <FontAwesomeIcon icon={[type, name]} className={`icon${className ? ` ${className}` : ''}`} { ...props } />
  );
}

Icon.SOLID = 'fas';
Icon.REGULAR = 'far';
Icon.BRAND = 'fab';

export default Icon;
