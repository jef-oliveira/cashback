import { CenterContent } from 'components';

import './styles.scss';

function PageContent({ containerClassName, ...props }) {
  return (
    <main className={`page-content${containerClassName ? ` ${containerClassName}` : ''}`}>
      <CenterContent { ...props } />
    </main>
  );
}

export default PageContent;
