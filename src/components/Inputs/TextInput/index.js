import { Icon } from 'components';

import './styles.scss';

function TextInput({ icon, iconType, text, className, style, ...props }) {
  return (
    <div className={`text-input${className ? ` ${className}` : ''}`} style={style}>
      {icon?.length && <Icon name={icon} type={iconType} className="left-icon" />}
      {text?.length && <span className="left-text">{text}</span>}
      <input autoComplete="none" { ...props } />
    </div>
  );
}

export default TextInput;
