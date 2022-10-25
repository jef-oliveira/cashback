import { Page } from 'components';

function Wishlist() {
  return (
    <Page adminOnly={true} style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2>Lista de desejos</h2>
      <span><strong>Ideia:</strong> qualquer usuário poderá adicionar um item da loja à sua lista.</span>
      <span style={{ textAlign: 'center' }}>Um administrador poderá extrair uma relação dos itens em encomenda/pré-venda desejados e suas quantidades, pra facilitar a montagem dos pedidos aos fornecedores.</span>
    </Page>
  );
}

export default Wishlist;
