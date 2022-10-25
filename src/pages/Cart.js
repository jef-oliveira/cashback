import { Page } from 'components';

function Cart() {
  return (
    <Page style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2>Carrinho</h2>
      <span><strong>Ideia:</strong> qualquer usuário poderá adicionar itens em estoque ao carrinho.</span>
      <span style={{ textAlign: 'center' }}>Será possível criar um novo pedido com os ites adicionados, gerando cashback ao concluir.</span>
    </Page>
  );
}

export default Cart;
