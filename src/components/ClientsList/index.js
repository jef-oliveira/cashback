import { useState } from 'react';

import ListHead from './ListHead';
import ListBody from './ListBody';
import './styles.css';

function ClientsList({ search, onClick, className, ...props }) {
  const [sorting, setSorting] = useState({ by: 'name', direction: 'asc' });

  return (
    <table className={`clients-list${className ? ` ${className}` : ''}`} { ...props }>
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
  { column: 'name', icon: 'user', label: 'Cliente' },
  { column: 'phone', icon: 'phone', label: 'Telefone' },
  { column: 'lastTransaction', icon: 'receipt', label: 'Último lançamento' },
  { column: 'cashbackBalance', icon: 'coins', label: 'Cashback' },
];

export default ClientsList;
