import { Link } from 'react-router-dom';

function Stats() {
  return (
    <>
      <h2>Configurações</h2>
      <p>
        <span>É ideia é ver estatísticas e gerenciar todos os aspectos da loja.</span><br/>
        <span>Será possível <Link to="clients">configurar clientes</Link>, <Link to="storage">cadastar estoque</Link>, dentre outras ferramentas.</span>
      </p>
    </>
  );
}

export default Stats;
