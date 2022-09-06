import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Icon({ name, type = 'fas', ...props }) {
  return (
    <FontAwesomeIcon icon={[type, name]} { ...props } />
  );
}

Icon.REGULAR = 'fas';
Icon.BRAND = 'fab';

export default Icon;
