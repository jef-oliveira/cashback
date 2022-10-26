import { Page } from 'components';

import './styles.scss';

function Cart() {
  return (
    <Page className="cart-page">
      <h2>Carrinho</h2>
      <p>
        <span>A ideia é que qualquer cliente poderá adicionar itens da loja ao carrinho.</span><br/>
        <span>Quando autenticado, será possível criar um novo pedido com os ites adicionados, o que vai gerar cashback ao ser concluído.</span>
      </p>
    </Page>
  );
}

export default Cart;
