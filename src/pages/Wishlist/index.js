import { Page } from 'components';

import './styles.scss';

function Wishlist() {
  return (
    <Page className="wishlist-page" authOnly>
      <h2>Lista de desejos</h2>
      <p>
        <span>A ideia é que qualquer cliente autenticado poderá adicionar itens da loja à sua lista.</span><br/>
        <span>Mais tarde, um administrador poderá extrair uma relação dos itens em pré-venda/encomenda desejados e suas quantidades, pra facilitar a montagem dos pedidos aos fornecedores.</span>
      </p>
    </Page>
  );
}

export default Wishlist;
