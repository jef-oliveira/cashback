import { useState, useCallback } from 'react';
import { Page, ProfileData, Info, Icon, TransactionHistoryDialog } from 'components';
import { useSession } from 'context';

import './styles.scss';

function Account() {
  const { currentUser } = useSession();
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);

  const showHistory = useCallback(function(event) {
    event.preventDefault();
    setShowTransactionHistory(true);
  }, []);

  const hideHistory = useCallback(function() {
    setShowTransactionHistory(false);
  }, []);

  return (
    <Page authOnly className="account-page">
      <ProfileData person={currentUser} />

      <div className="cashback-message">
        {Boolean(currentUser) && (
          <h3>Você possui <TransactionHistoryDialog.Value ammount={currentUser.cashbackBalance} /> de cashback!</h3>
        )}
        <a href="history" onClick={showHistory}>
          <Icon name="receipt"/>Histórico de lançamentos
        </a>
      </div>

      <Info>
        A ideia é qualquer cliente autenticado poderá ver e editar suas informações pessoais. Também será possível ver o próprio saldo acumulado de cashback e o histórico de compras.
      </Info>

      {Boolean(currentUser && showTransactionHistory) && (
        <TransactionHistoryDialog client={currentUser} onCancel={hideHistory} />
      )}
    </Page>
  );
}

export default Account;
