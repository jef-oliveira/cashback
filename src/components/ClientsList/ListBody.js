import { useCallback, useMemo } from 'react';

import { Icon } from 'components';
import { useClients } from 'context';

import { COLUMNS } from './';

function ListBody({ search, sorting, onClick }) {
  const clients = useClients(search, sorting);

  if (clients.length)
    return (
      clients.map(client => (
        <tr key={client.id}>
          {COLUMNS.map((column, index) => (
            <ListData key={index} { ...column } client={client} onClick={onClick} />
          ))}
        </tr>
      ))
    );
  else
    return (
      <EmptyData />
    );
}

function ListData({ column, client, onClick }) {
  const handleClick = useCallback(function() {
    if (onClick)
      onClick({ column, client });
  }, [column, client, onClick]);

  const whatsappLink = useMemo(function() {
    return `https://wa.me/55${client.phone}?text=Você ainda tem R$ ${toMonetaryString(client.cashbackBalance)} de cashback na loja. Aproveita e dá uma passada aqui!`
  }, [client]);

  switch(column) {
    case 'name':
      return (
        <td>
          <span onClick={handleClick}>
            {client.name}
            {client.registered && <Icon name="address-card" type={Icon.REGULAR} title="Autenticado" />}
            {client.admin && <Icon name="screwdriver-wrench" title="Administrador" />}
          </span>
        </td>
      );
    case 'phone':
      return (
        <td>
          {client.phone?.length > 0 && (
            <a target="_blank" rel="noreferrer" href={whatsappLink}>
              {client.phone}
            </a>
          )}
        </td>
      );
    case 'lastTransaction':
      return (
        <td>
          <span onClick={handleClick}>
            {client.lastTransaction ? client['lastTransaction'].date.toLocaleString() : '-'}
          </span>
        </td>
      );
    case 'cashbackBalance':
      return (
        <td>
          <span onClick={handleClick}>
            {client.cashbackBalance ? `R$ ${toMonetaryString(client.cashbackBalance)}` : '-'}
          </span>
        </td>
      );
    default:
      return null;
  }
}

function EmptyData() {
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

function toMonetaryString(number) {
  return (number).toFixed(2).replace('.', ',');
}

export default ListBody;