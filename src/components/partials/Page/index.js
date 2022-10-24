import { useLocation, Navigate } from 'react-router-dom';

import { useSession } from 'context';

import PageHeader from '../PageHeader';
import PageContent from '../PageContent';
import PageFooter from '../PageFooter';

function Page({ isProtected, ...props }) {
  const { currentUser } = useSession();
  const location = useLocation();

  if (isProtected && !currentUser)
    return (
      <Navigate to="/" state={{ from: location }} replace />
    );

  return (
    <>
      <PageHeader />
      <PageContent { ...props } />
      <PageFooter />
    </>
  );
}

export default Page;
