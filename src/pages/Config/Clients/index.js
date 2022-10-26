import { useClients } from 'context';
import { Client } from 'models';

function Cashback() {
  const clients = useClients();

  return (
    <>
      <h2>Clientes e cashback</h2>
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
    </>
  );
}

export default Cashback;
