import { useState, useCallback } from 'react';

import { useDataInitialized } from './context';
import Loader from './components/Loader';
import Header from './components/Header';
import ActionBar from './components/ActionBar';
import ClientsList from './components/ClientsList';

import ClientFormDialog from './components/ClientFormDialog';
import TransactionFormDialog from './components/TransactionFormDialog';

import './App.css';

function App() {
  const dataInitialized = useDataInitialized();
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState();
  const [showClientForm, setShowClientForm] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  const handleSearch = useCallback(function(newSearch) {
    setSearch(newSearch);
  }, []);

  const handleAddClient = useCallback(function() {
    setSelectedClient({ name: search });
    setShowClientForm(true);
  }, [search]);

  const closeClientForm = useCallback(function() {
    setShowClientForm(false);
    setSelectedClient();
  }, []);

  const closeTransactionForm = useCallback(function() {
    setShowTransactionForm(false);
    setSelectedClient();
  }, []);

  const handleClientListClick = useCallback(function({ client, column }) {
    setSelectedClient(client);
    if (column === 'name')
      setShowClientForm(true);
    else
      setShowTransactionForm(true);
  }, []);

  return (
    <div className="app">
      <Header />
      <ActionBar onSearch={handleSearch} onAddClient={handleAddClient} />
      <ClientsList search={search} onClick={handleClientListClick} />

      {showClientForm && (
        <ClientFormDialog client={selectedClient} onCancel={closeClientForm} />
      )}
      {showTransactionForm && (
        <TransactionFormDialog client={selectedClient} onCancel={closeTransactionForm} />
      )}

      {!dataInitialized && <Loader />}
    </div>
  );
}

export default App;
