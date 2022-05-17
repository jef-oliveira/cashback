import { useCallback } from 'react';

import Overlay from '../Overlay';
import Button from '../Button';

import './styles.css';

function Header({ title, cancelLabel = 'Cancelar', onCancel, confirmLabel = 'Confirmar', onConfirm, className, children, ...props }) {
  const handleSubmit = useCallback(function(event) {
    event.preventDefault();
    if (onConfirm)
      onConfirm();
  }, [onConfirm]);

  return (
    <Overlay className={`dialog${className ? ` ${className}` : ''}`} { ...props }>
      <form onSubmit={handleSubmit}>
        <section className="content-container">
          {title?.length > 0 && (
            <header className="title">
              <h2>{title}</h2>
            </header>
          )}

          <div className="content">
            {children}
          </div>

          <footer className="action">
            {Boolean(onCancel) && <Button type="button" onClick={onCancel}>{cancelLabel}</Button>}
            {Boolean(onConfirm) && <Button type="submit" theme="primary">{confirmLabel}</Button>}
          </footer>
        </section>
      </form>
    </Overlay>
  );
}

export default Header;
