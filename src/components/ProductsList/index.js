import { useState } from 'react';

import ListHead from './ListHead';
import ListBody from './ListBody';
import './styles.scss';

function ProductsList({ search, onClick, className, ...props }) {
  const [sorting, setSorting] = useState({ by: 'title', direction: 'asc' });

  return (
    <table className={`products-list${className ? ` ${className}` : ''}`} { ...props }>
      <thead>
        <ListHead sorting={sorting} onSort={setSorting} />
      </thead>
      <tbody>
        <ListBody search={search} sorting={sorting} onClick={onClick} />
      </tbody>
    </table>
  );
}

export const COLUMNS = [
  { column: 'title', icon: 'book', label: 'Título' },
  { column: 'publisher', icon: 'building', label: 'Editora' },
  { column: 'price', icon: 'money-bill-1', label: 'Preço de capa' },
  { column: 'quantity', icon: 'box-open', label: 'Quantidade' },
];

export default ProductsList;
