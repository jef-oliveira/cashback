import './styles.scss';

function Overlay({ className, ...props }) {
  return (
    <div className={`overlay${className ? ` ${className}` : ''}`} { ...props } />
  );
}

export default Overlay;
