import './styles.scss';

function CenterSection({ className, ...props }) {
  return (
    <section className={`center-section${className ? ` ${className}` : ''}`} { ...props } />
  );
}

export default CenterSection;
