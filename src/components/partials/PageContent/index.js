import { CenterContent } from 'components';

import './styles.scss';

function PageContent({ className, ...props }) {
  return (
    <main className={`page-content${className ? ` ${className}` : ''}`} { ...props }>
      <CenterContent>
        {[...Array(10)].map((_, index) => (
          <p key={index}>page content</p>
        ))}
      </CenterContent>
    </main>
  );
}

export default PageContent;
