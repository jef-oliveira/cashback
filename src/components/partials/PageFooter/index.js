import React from 'react';

import { CenterContent, Icon } from 'components';

import './styles.scss';

function PageFooter({ className, ...props }) {
  return (
    <footer className={`page-footer${className ? ` ${className}` : ''}`} { ...props }>
      <CenterContent>
        <div className="block">
          <span><strong>Escudo GEEK</strong></span>
          <span>CNPJ 32.330.358/001-79</span>
          <span>R. Félix Xavier da Cunha, 803 - Centro, Pelotas - RS</span>
        </div>
        <div className="block">
          <SocialLink href="https://wa.me/5553991462142" icon="whatsapp">
            WhatsApp: (53) 99146-2142
          </SocialLink>
          <SocialLink href="https://www.instagram.com/escudogeek" icon="instagram">
            Instagram: @escudogeek
          </SocialLink>
          <SocialLink href="https://www.facebook.com/escudogeek" icon="facebook">
            Facebook: @escudogeek
          </SocialLink>
        </div>
        <p className="version">©2016-{new Date().getFullYear()} v.{process.env.REACT_APP_VERSION}</p>
      </CenterContent>
    </footer>
  );
}

function SocialLink({ href, icon, children }) {
  return(
    <a target="_blank" rel="noreferrer" href={href}>
      <Icon name={icon} type={Icon.BRAND} /> {children}
    </a>
  );
}

export default React.memo(PageFooter);
