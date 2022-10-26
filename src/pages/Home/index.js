import { Page } from 'components';

import './styles.scss';

function Home() {
  return (
    <Page className="home-page">
      <h2>Início</h2>
      <p>
        <span>A ideia é listar os itens cadastrados na loja.</span><br/>
        <span>Itens podem estar disponíveis a pronta entrega ou por encomenda/pré-venda, e podem ser adicionados ao carrinho ou à lista de desejos.</span>
      </p>
    </Page>
  );
}

export default Home;
