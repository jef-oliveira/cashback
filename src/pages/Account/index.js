import { Page, Icon } from 'components';
import { useSession } from 'context';

import './styles.scss';

function Account() {
  const { currentUser } = useSession();

  return (
    <Page authOnly className="account-page">
      <p className="profile-data">
        <img scr={currentUser?.photo} alt="foto" style={{ width: '64px', borderRadius: '100%', content: `url(${currentUser?.photo})` }} />
        <span>
          {currentUser?.admin && <><Icon name="screwdriver-wrench" />{` `}</>}
          {currentUser?.name}
        </span>
        <span>{currentUser?.email}</span>
      </p>
      <p>
        <span>A ideia é qualquer cliente autenticado poderá ver e editar suas informações pessoais.</span><br/>
        <span>Também será possível ver o próprio saldo acumulado de cashback e o histórico de pedidos.</span>
      </p>
    </Page>
  );
}

export default Account;
