import { Link } from 'react-router-dom';

import { Info, Input } from 'components';
import { useCorsServiceKey, useClients, useProducts } from 'context';

function Stats() {
  const [serviceKey, setServiceKey] = useCorsServiceKey();
  const products = useProducts();
  const clients = useClients();

  return (
    <>
      <h2>Configurações</h2>
      <Info>
        A ideia é ver estatísticas e gerenciar todos os aspectos da loja. Será possível <Link to="clients">configurar clientes</Link>, <Link to="storage">cadastar estoque</Link>, dentre outras ferramentas.
      </Info>

      <Info type={Info.SUCCESS}>
        <strong>{clients.length}</strong> clientes, <strong>{products.length}</strong> produtos!
      </Info>

      <Input
        label="Chave temporária de busca ISBN"
        text="https://justcors.com/"
        value={serviceKey}
        onChange={event => setServiceKey(event.target.value)}
        style={{ width: '348px' }}
      />
    </>
  );
}

export default Stats;
