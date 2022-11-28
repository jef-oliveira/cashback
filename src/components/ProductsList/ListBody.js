import { useCallback } from 'react';

import { Icon } from 'components';
import { useProducts } from 'context';
import { toMonetaryString } from 'utils';

import { COLUMNS } from './';

function ListBody({ search, sorting, onClick }) {
  const products = useProducts(search, sorting);

  if (products.length)
    return (
      products.map(product => (
        <ListRow key={product.id} product={product} onClick={onClick} />
      ))
    );
  else
    return (
      <EmptyRow />
    );
}

function ListRow({ product, onClick }) {
  const handleClick = useCallback(function() {
    if (onClick)
      onClick(product);
  }, [product, onClick]);

  return (
    <tr onClick={handleClick}>
      {COLUMNS.map((column, index) => (
        <ListData key={index} { ...column } product={product} />
      ))}
    </tr>
  );
}

function ListData({ column, product }) {
  return (
    <td>
      <span>
        {column === 'price' ? toMonetaryString(product[column]) : product[column]}
      </span>
    </td>
  );
}

function EmptyRow() {
  return (
    <tr className="empty">
      <td colSpan={COLUMNS.length}>
        <Icon name="ban" />
        <h2>Nenhum produto encontrado.</h2>
        <span>Adicione novos produtos clicando em "Adicionar produto"!</span>
      </td>
    </tr>
  );
}

export default ListBody;