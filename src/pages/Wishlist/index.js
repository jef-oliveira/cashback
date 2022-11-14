import { Page, Info } from 'components';

import './styles.scss';

function Wishlist() {
  return (
    <Page className="wishlist-page" authOnly>
      <h2>Lista de desejos</h2>
      <Info>
        A ideia é que qualquer cliente autenticado poderá adicionar itens da loja à sua lista. Mais tarde, um administrador poderá extrair uma relação dos itens em pré-venda/encomenda desejados e suas quantidades, pra facilitar a montagem dos pedidos aos fornecedores.
      </Info>
    </Page>
  );
}

export default Wishlist;
