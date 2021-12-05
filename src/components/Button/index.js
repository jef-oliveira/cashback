import './styles.css';

function Button({ theme = 'regular', className, children, ...props }) {
  return (
    <button className={`button ${theme}${className ? ` ${className}` : ''}`} { ...props }>
      {children}
    </button>
  );
}

export default Button;
