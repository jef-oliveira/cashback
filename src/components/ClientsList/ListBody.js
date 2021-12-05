import { useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useClients } from '../../context';
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
    return `https://wa.me/55${client.phone}?text=Você ainda tem R$ ${toMonetaryString(client.cashbackBalance)} de cashback aqui na loja. Aproveita e dá uma passada aqui!`
  }, [client]);

  switch(column) {
    case 'name':
      return (
        <td>
          <span onClick={handleClick}>
            {client.name}
            <FontAwesomeIcon icon={['fas', 'user-edit']} className="edit-icon" />
          </span>
        </td>
      );
    case 'phone':
      return (
        <td>
          {client.phone?.length > 0 && (
            <a target="_blank" rel="noreferrer" href={whatsappLink}>
              {client.phone}
              <FontAwesomeIcon icon={['fab', 'whatsapp']} className="edit-icon" />
            </a>
          )}
        </td>
      );
    case 'lastTransaction':
      return (
        <td>
          <span onClick={handleClick}>
            {client.lastTransaction ? client['lastTransaction'].date.toLocaleString() : '-'}
            <FontAwesomeIcon icon={['fas', 'donate']} className="edit-icon" />
          </span>
        </td>
      );
    case 'cashbackBalance':
      return (
        <td>
          <span onClick={handleClick}>
            {client.cashbackBalance ? `R$ ${toMonetaryString(client.cashbackBalance)}` : '-'}
            <FontAwesomeIcon icon={['fas', 'donate']} className="edit-icon" />
          </span>
        </td>
      );
    default:
      return null;
  }
}

function EmptyData() {
  return (
    <tr>
      <td colSpan="999" className="empty">
        <FontAwesomeIcon icon={['fas', 'ban']} className="empty-icon" />
        <span className="message">Nenhum cliente encontrado.</span>
        <span className="tip">Adicione novos clientes clicando em "Adicionar cliente"!</span>
      </td>
    </tr>
  );
}

function toMonetaryString(number) {
  return (number).toFixed(2).replace('.', ',');
}

export default ListBody;