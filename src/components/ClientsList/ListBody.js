import { useCallback } from 'react';

import { Icon } from 'components';
import { useClients } from 'context';
import { toMonetaryString } from 'utils';

import { COLUMNS } from './';

function ListBody({ search, sorting, onClick }) {
  const clients = useClients(search, sorting);

  if (clients.length)
    return (
      clients.map(client => (
        <ListRow key={client.id} client={client} onClick={onClick} />
      ))
    );
  else
    return (
      <EmptyRow />
    );
}

function ListRow({ client, onClick }) {
  const handleClick = useCallback(function() {
    if (onClick)
      onClick(client);
  }, [client, onClick]);

  return (
    <tr onClick={handleClick}>
      {COLUMNS.map((column, index) => (
        <ListData key={index} { ...column } client={client} />
      ))}
    </tr>
  );
}

function ListData({ column, client }) {
  switch(column) {
    case 'name':
      return (
        <td>
          <span>
            {client.name}
            {client.registered && <Icon name="address-card" type={Icon.REGULAR} title="Autenticado" />}
            {client.admin && <Icon name="screwdriver-wrench" title="Administrador" />}
          </span>
        </td>
      );
    case 'phone':
      return (
        <td>
          {client.phone || '-'}
        </td>
      );
    case 'lastTransaction':
      return (
        <td>
          <span>
            {client.lastTransaction?.date.toLocaleString() || '-'}
          </span>
        </td>
      );
    case 'cashbackBalance':
      return (
        <td>
          <span>
            {toMonetaryString(client.cashbackBalance)}
          </span>
        </td>
      );
    default:
      return null;
  }
}

function EmptyRow() {
  return (
    <tr className="empty">
      <td colSpan={COLUMNS.length}>
        <Icon name="ban" />
        <h2>Nenhum cliente encontrado.</h2>
        <span>Adicione novos clientes clicando em "Adicionar cliente"!</span>
      </td>
    </tr>
  );
}

export default ListBody;