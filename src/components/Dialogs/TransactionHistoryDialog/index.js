import { useMemo } from 'react';

import { Dialog, ProfileData, Icon } from 'components';
import { toMonetaryString } from 'utils';

import './styles.scss';

function TransactionHistoryDialog({ client, onCancel, ...props }) {
  return (
    <Dialog
      { ...props }
      title="Histórico de lançamentos"
      cancelLabel="OK"
      onCancel={onCancel}
      className="transaction-history-dialog"
    >
      <ProfileData person={client} />
      <table>
        <tbody>
          {client.transactions.sort((t1, t2) => t1.date - t2.date).map(transaction => (
            <tr key={transaction.date.getTime()}>
              <td><small>{transaction.date.toLocaleString()}</small></td>
              <td><Value ammount={transaction.value} /></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
              <strong>Saldo atual: {toMonetaryString(client.cashbackBalance)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </Dialog>
  );
}

function Value({ initial, ammount }) {
  const { difference, className } = useMemo(() => {
    const difference = (ammount || 0) - (initial || 0);
    const className = !difference ? 'unchanged' : difference > 0 ? 'increased' : 'decreased';
    return { difference, className };
  }, [initial, ammount]);

  return (
    <span className={`transaction-history-value ${className}`}>
      {toMonetaryString(ammount)}
      {Boolean(difference) && <Icon name={`caret-${difference > 0 ? 'up' : 'down'}`} />}
      {!Boolean(difference) && <Icon name="equals" />}
    </span>
  );
}

TransactionHistoryDialog.Value = Value;

export default TransactionHistoryDialog;
