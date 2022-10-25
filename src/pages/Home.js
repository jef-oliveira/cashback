import { Page } from 'components';

function Home() {
  return (
    <Page style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2>Início</h2>
      <span><strong>Ideia:</strong> listar os itens disponíveis na loja.</span>
      <span style={{ textAlign: 'center' }}>Itens podem estar disponíveis a pronta entrega ou encomenda/pré-venda, e podem ser adicionados ao carrinho ou à lista de desejos.</span>
    </Page>
  );
}

export default Home;
