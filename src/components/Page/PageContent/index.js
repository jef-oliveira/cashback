import { CenterSection } from 'components';

import './styles.scss';

function PageContent({ containerClassName, ...props }) {
  return (
    <main className={`page-content${containerClassName ? ` ${containerClassName}` : ''}`}>
      <CenterSection { ...props } />
    </main>
  );
}

export default PageContent;
