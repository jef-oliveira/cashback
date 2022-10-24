import { Page } from 'components';

function Account() {
  return (
    <Page isProtected={true}>
      <div style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Account!
      </div>
    </Page>
  );
}

export default Account;
