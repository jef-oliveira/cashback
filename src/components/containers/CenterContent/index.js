import React from 'react';

import './styles.scss';

function CenterContent({ className, ...props }) {
  return (
    <section className={`center-content${className ? ` ${className}` : ''}`} { ...props } />
  );
}

export default React.memo(CenterContent);
