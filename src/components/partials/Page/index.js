import PageHeader from '../PageHeader';
import PageContent from '../PageContent';
import PageFooter from '../PageFooter';

function Page({ adminOnly, authOnly, ...props }) {
  return (
    <>
      <PageHeader />
      <PageContent { ...props } />
      <PageFooter />
    </>
  );
}

export default Page;
