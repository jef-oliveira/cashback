import { useState, useMemo, useCallback } from 'react';

import { Dialog, Input } from 'components';
import { Client } from 'models';

import './styles.scss';

function ClientFormDialog({ client, onCancel, ...props }) {
  const [name, setName] = useState(client.name || '');
  const [phone, setPhone] = useState(client.phone || '');
  const [initialCashback, setInitialCashback] = useState('');

  const title = useMemo(function() {
    return `${client.id ? 'Editar' : 'Adicionar'} cliente`;
  }, [client]);

  const message = useMemo(() => {
    if (client.id)
      return `${client.name} está acumulando cashback desde ${client.createdAt.toLocaleDateString()}!`;
    else
      return 'Adicione um novo cliente para começar a acumular cashback!';
  }, [client]);

  const handleConfirm = useCallback(function() {
    const savingClient = new Client(client.__doc);
    savingClient.setProps({ name, phone, initialCashback });
    savingClient.save().then(function() {
      if (onCancel)
        onCancel();
    });
  }, [client, name, phone, initialCashback, onCancel]);

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
