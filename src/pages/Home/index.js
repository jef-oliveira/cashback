import { Page, Info } from 'components';

import './styles.scss';

function Home() {
  return (
    <Page className="home-page">
      <h2>Início</h2>
      <Info>
        A ideia é listar os itens cadastrados na loja. Itens podem estar disponíveis a pronta entrega ou por encomenda/pré-venda, e podem ser adicionados ao carrinho ou à lista de desejos.
      </Info>
    </Page>
  );
}

export default Home;
