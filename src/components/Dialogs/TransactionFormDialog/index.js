import { useState, useMemo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useClientOperations } from '../../context';
import Dialog from '../Dialog';
import Input from '../Input';
import TransactionHistoryDialog from '../TransactionHistoryDialog';

import './styles.css';

function TransactionFormDialog({ client, onCancel, ...props }) {
  const [value, setValue] = useState('');
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);

  const { addTransaction } = useClientOperations();

  const minValue = useMemo(() => {
    return client.cashbackBalance * -1;
  }, [client]);

  const balanceResult = useMemo(() => {
    return value > 0 ? 'increase' : value < 0 ? 'decrease' : 'same';
  }, [value]);

  const handleConfirm = useCallback(function() {
    addTransaction(client, { date: new Date(), value });
    if (onCancel)
      onCancel();
  }, [client, value, onCancel, addTransaction]);

  const showHistory = useCallback(function() {
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
        <p>Adicione cashback para {client.name} informando um valor positivo, ou remova com um valor negativo. O valor será lançado com a data e hora de agora.</p>

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
          <div className={`balance-message ${balanceResult}`}>R$ {toMonetaryString(client.cashbackBalance + (value || 0))}</div>
        </div>

        <p className="history" onClick={showHistory}>
          <FontAwesomeIcon icon={['fas', 'receipt']} className="history-icon" />
          Ver histórico de lançamentos
        </p>
      </Dialog>

      {showTransactionHistory && (
        <TransactionHistoryDialog client={client} onCancel={hideHistory} />
      )}
    </>
  );
}

function toMonetaryString(number) {
  return (number).toFixed(2).replace('.', ',');
}

export default TransactionFormDialog;