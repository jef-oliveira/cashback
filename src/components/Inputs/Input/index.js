import { Icon } from 'components';

import './styles.scss';

function Input({ icon, iconType, text, className, style, ...props }) {
  return (
    <div className={`input${className ? ` ${className}` : ''}`} style={style}>
      {icon?.length && <Icon name={icon} type={iconType} className="left-icon" />}
      {text?.length && <span className="left-text">{text}</span>}
      <input autoComplete="none" { ...props } />
    </div>
  );
}

export default Input;
