import Dialog from '../Dialog';

import './styles.css';

function TransactionHistoryDialog({ client, onCancel, ...props }) {
  const countEnding = client.transactions.length === 1 ? 'o' : 'os';

  return (
    <Dialog
      { ...props }
      title={`Movimentações de ${client.name}`}
      cancelLabel="OK"
      onCancel={onCancel}
      className="transaction-dialog"
    >
      <p>{client.name} tem {client.transactions.length} lançament{countEnding} registrad{countEnding}!</p>
      <table>
        <tbody>
          {client.transactions.sort((t1, t2) => t1.date - t2.date).map(transaction => (
            <tr key={transaction.date.getTime()}>
              <td className="date">{transaction.date.toLocaleString()}</td>
              <td className={transaction.value > 0 ? 'increased' : 'decreased'}>
                R$ {toMonetaryString(transaction.value)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
              Cashback: R$ {toMonetaryString(client.cashbackBalance)}
            </td>
          </tr>
        </tfoot>
      </table>
    </Dialog>
  );
}

function toMonetaryString(number) {
  return (number).toFixed(2).replace('.', ',');
}

export default TransactionHistoryDialog;
