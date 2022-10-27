import { useCallback } from 'react';

import { Overlay, Button } from 'components';

import './styles.scss';

function Dialog({ title, cancelLabel='Cancelar', onCancel, confirmLabel='Confirmar', onConfirm, className, children, ...props }) {
  const handleSubmit = useCallback(function(event) {
    event.preventDefault();
    if (onConfirm)
      onConfirm();
  }, [onConfirm]);

  return (
    <Overlay className={`dialog${className ? ` ${className}` : ''}`} { ...props }>
      <form onSubmit={handleSubmit}>
        <section className="content-container">
          {Boolean(title?.length) && (
            <header className="title">
              <h2>{title}</h2>
            </header>
          )}

          <div className="content">
            {children}
          </div>

          <footer className="action">
            {Boolean(onCancel) && <Button theme={Button.PRIMARY} onClick={onCancel}>{cancelLabel}</Button>}
            {Boolean(onConfirm) && <Button type="submit" theme={Button.PRIMARY} fill={Button.SOLID}>{confirmLabel}</Button>}
          </footer>
        </section>
      </form>
    </Overlay>
  );
}

export default Dialog;
