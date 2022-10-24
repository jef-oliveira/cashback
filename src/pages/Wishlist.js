import { Page } from 'components';

function Wishlist() {
  return (
    <Page isProtected={true}>
      <div style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Wishlist!
      </div>
    </Page>
  );
}

export default Wishlist;
