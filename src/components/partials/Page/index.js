import { useLocation, Navigate } from 'react-router-dom';

import { useSession } from 'context';

import PageHeader from '../PageHeader';
import PageContent from '../PageContent';
import PageFooter from '../PageFooter';

function Page({ authOnly, adminOnly, ...props }) {
  const location = useLocation();
  const { currentUser } = useSession();

  if ((authOnly && !currentUser) || (adminOnly && !currentUser?.admin))
    return (
      <Navigate to="/" state={{ from: location }} replace={true} />
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
