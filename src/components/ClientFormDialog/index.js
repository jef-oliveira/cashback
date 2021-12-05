import { useState, useMemo, useCallback } from 'react';

import { useClientOperations } from '../../context';
import Dialog from '../Dialog';
import Input from '../Input';

import './styles.css';

function ClientFormDialog({ client, onCancel, ...props }) {
  const [name, setName] = useState(client.name || '');
  const [phone, setPhone] = useState(client.phone || '');
  const [initialCashback, setInitialCashback] = useState('');

  const { addClient, editClient } = useClientOperations();

  const title = useMemo(function() {
    return `${client.id ? 'Editar' : 'Adicionar'} cliente`;
  }, [client]);

  const message = useMemo(() => {
    if (client.id)
      return `${client.name} está acumulando cashback com o Escudo Geek desde ${client.creationDate.toLocaleDateString()}!`;
    else
      return 'Adicione um novo cliente para começar a acumular cashback com o Escudo Geek!';
  }, [client]);

  const handleConfirm = useCallback(function() {
    const clientData = { name, phone, initialCashback };
    if (client.id)
      editClient(client.id, clientData)
    else
      addClient(clientData)

    if (onCancel)
      onCancel();
  }, [client, name, phone, initialCashback, addClient, editClient, onCancel]);

  return (
    <Dialog
      { ...props }
      title={title}
      onCancel={onCancel}
      onConfirm={handleConfirm}
      className="client-dialog"
    >
      <p>{message}</p>

      <Input
        type="text"
        icon="user"
        placeholder="Nome"
        value={name}
        onChange={event => setName(event.target.value)}
        className="name"
        autoFocus={true}
        required={true}
      />

      <Input
        type="tel"
        icon="phone"
        placeholder="Telefone"
        value={phone}
        onChange={event => setPhone(event.target.value)}
        maxLength={11}
        className="phone"
      />

      {!client.id && (
        <Input
          type="number"
          icon="coins"
          text="R$"
          placeholder="Cashback inicial"
          value={initialCashback}
          onChange={event => setInitialCashback(event.target.valueAsNumber || '')}
          min={0}
          step="any"
          className="initial-cashback"
        />
      )}
    </Dialog>
  );
}

export default ClientFormDialog;
