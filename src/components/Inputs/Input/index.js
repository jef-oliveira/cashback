import { Icon } from 'components';

import './styles.scss';

function Input({ label, icon, iconType, text, className, style, ...props }) {
  return (
    <label className={`input${className ? ` ${className}` : ''}`} style={style}>
      {Boolean(label?.length) && <small>{label}</small>}
      <div className="container">
        {icon?.length && <Icon name={icon} type={iconType} className="left-icon" />}
        {text?.length && <span className="left-text">{text}</span>}
        <input { ...props } />
      </div>
    </label>
  );
}

export default Input;
