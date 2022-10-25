import { Page, Icon } from 'components';
import { useSession } from 'context';

function Account() {
  const { currentUser } = useSession();

  return (
    <Page authOnly={true} style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img scr={currentUser?.photo} alt="foto" style={{ width: '64px', borderRadius: '100%', content: `url(${currentUser?.photo})` }} />
        <span>
          {currentUser?.admin && <><Icon name="screwdriver-wrench" />{` `}</>}
          {currentUser?.name}
        </span>
        <span>{currentUser?.email}</span>
      </div>
      <span><strong>Ideia:</strong> qualquer usuário poderá ver e editar suas informações pessoais.</span>
      <span style={{ textAlign: 'center' }}>Também será possível ver o próprio saldo acumulado de cashback e o histórico de pedidos.</span>
    </Page>
  );
}

export default Account;
