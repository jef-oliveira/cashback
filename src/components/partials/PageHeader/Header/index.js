import './styles.scss';

function PageHeader({ className, ...props }) {
  return (
    <header className={`page-header${className ? ` ${className}` : ''}`} { ...props } />
  );
}

export default PageHeader;
