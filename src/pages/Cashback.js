import { Page } from 'components';
import { useClients } from 'context';
import { Client } from 'models';

function Cashback() {
  const clients = useClients();

  return (
    <Page adminOnly={true}>
      <div style={{ width: '100%', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span>Cashback!</span>
        <span>---</span>
        {clients.map(c => (
          <span key={c.id}>
            {`(${c.id}) ${c.name}`}
            {' '}<button onClick={async () => {
              c.name += '!';
              await c.save();
            }}>Editar</button>
            {' '}<button onClick={async () => {
              await c.delete();
            }}>Excluir</button>
          </span>
        ))}
        <button onClick={async () => {
          const count = (clients.length + 1);
          const model = new Client({ id: 'model-' + count, name: 'Novo ' + count });
          await model.save();
        }}>Novo</button>
      </div>
    </Page>
  );
}

export default Cashback;
