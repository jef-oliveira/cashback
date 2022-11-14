import { Page, Info } from 'components';

import './styles.scss';

function Cart() {
  return (
    <Page className="cart-page">
      <h2>Carrinho</h2>
      <Info>
        A ideia é que qualquer cliente poderá adicionar itens da loja ao carrinho. Quando autenticado, será possível criar um novo pedido com os ites adicionados, o que vai gerar cashback automaticamente quando este pedido for dado como concluído.
      </Info>
    </Page>
  );
}

export default Cart;
