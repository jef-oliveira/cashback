import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.css';

function Input({ icon, text, className, style, ...props }) {
  return (
    <div className={`input${className ? ` ${className}` : ''}`} style={style}>
      {icon?.length && <FontAwesomeIcon icon={['fas', icon]} className="left-icon" />}
      {text?.length && <span className="left-text">{text}</span>}
      <input autoComplete="none" { ...props } />
    </div>
  );
}

export default Input;
