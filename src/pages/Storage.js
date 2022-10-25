import { Page } from 'components';

function Storage() {
  return (
    <Page adminOnly={true} style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2>Controle de estoque</h2>
      <span><strong>Ideia:</strong> poder adicionar, editar e excluir itens do estoque da loja.</span>
      <span style={{ textAlign: 'center' }}>Itens terão dados como nome, imagem, preço, quantidade em estoque, se são pronta entrega ou encomenda/pré-venda.</span>
    </Page>
  );
}

export default Storage;
