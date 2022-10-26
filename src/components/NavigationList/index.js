import { Link } from 'react-router-dom';

import { Icon } from 'components';
import './styles.scss';

function NavigationList({ align = 'right', className, children, ...props }) {
  return (
    <nav className={`navigation-list align-${align}${className ? ` ${className}` : ''}`} { ...props }>
      <ul>
        {children}
      </ul>
    </nav>
  );
}

function NavigationItem({ icon, title, className, children, ...otherProps }) {
  return(
    <Link className={`navigation-item${className ? ` ${className}` : ''}`} { ...otherProps }>
      <li>
        <Icon name={icon} /><span> {title}</span>
        {children}
      </li>
    </Link>
  );
}

NavigationList.Item = NavigationItem;
NavigationList.LEFT = 'left';
NavigationList.RIGHT = 'right';

export default NavigationList;
