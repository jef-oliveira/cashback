import { Link } from 'react-router-dom';

import { Info } from 'components';

function Stats() {
  return (
    <>
      <h2>Configurações</h2>
      <Info>
        A ideia é ver estatísticas e gerenciar todos os aspectos da loja. Será possível <Link to="clients">configurar clientes</Link>, <Link to="storage">cadastar estoque</Link>, dentre outras ferramentas.
      </Info>
    </>
  );
}

export default Stats;
