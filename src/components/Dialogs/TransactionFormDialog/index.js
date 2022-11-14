import { useState, useMemo, useCallback } from 'react';

import { Client } from 'models';
import { Dialog, Input, ProfileData, Info, Icon, ClientFormDialog, TransactionHistoryDialog } from 'components';
import { toMonetaryString } from 'utils';

import './styles.scss';

function TransactionFormDialog({ client, onCancel, ...props }) {
  const [value, setValue] = useState('');
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [showClientFormDialog, setShowClientFormDialog] = useState(false);

  const minValue = useMemo(() => {
    return client.cashbackBalance * -1;
  }, [client]);

  const newBalanceValue = useMemo(() => {
    return client.cashbackBalance + (value || 0);
  }, [client, value])

  const handleConfirm = useCallback(function() {
    const savingClient = new Client(client.__doc);
    savingClient.addTransaction({ value });
    savingClient.save().then(function() {
      if (onCancel)
        onCancel();
    });
  }, [client, value, onCancel]);

  const showProfile = useCallback(function(event) {
    event.preventDefault();
    setShowClientFormDialog(true);
  }, []);

  const hideProfile = useCallback(function() {
    setShowClientFormDialog(false);
  }, []);

  const showHistory = useCallback(function(event) {
    event.preventDefault();
    setShowTransactionHistory(true);
  }, []);

  const hideHistory = useCallback(function() {
    setShowTransactionHistory(false);
  }, []);

  return (
    <>
      <Dialog
        { ...props }
        title="Lançar cashback"
        onCancel={onCancel}
        onConfirm={handleConfirm}
        className="transaction-form-dialog"
      >
        <div className="profile-container" >
          <ProfileData person={client} />
          <a href="profile" onClick={showProfile}>
            <Icon name="pen-to-square" />Editar perfil
          </a>
        </div>

        <Info>
          <strong>Adicione</strong> cashback informando um valor positivo, <strong>remova</strong> com um valor negativo. O lançamento ficará registrado com data e hora de agora.
        </Info>

        <div className="balance-container">
          <Input
            type="number"
            icon="coins"
            text="R$"
            placeholder="Valor do cashback"
            value={value}
            onChange={event => setValue(event.target.valueAsNumber || '')}
            required={true}
            autoFocus={true}
            min={minValue}
            step="any"
          />
          <div className="balance-result">
            <small>passará de {toMonetaryString(client.cashbackBalance)} para</small>
            <TransactionHistoryDialog.Value initial={client.cashbackBalance} ammount={newBalanceValue} />
          </div>
        </div>

        <a href="history" onClick={showHistory}>
          <Icon name="receipt"/>Histórico de lançamentos
        </a>
      </Dialog>

      {showClientFormDialog && (
        <ClientFormDialog client={client} onCancel={hideProfile} />
      )}

      {showTransactionHistory && (
        <TransactionHistoryDialog client={client} onCancel={hideHistory} />
      )}
    </>
  );
}

export default TransactionFormDialog;