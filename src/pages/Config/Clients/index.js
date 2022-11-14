import { useState, useCallback } from 'react';

import { Input, Button, ClientsList, ClientFormDialog, TransactionFormDialog } from 'components';

import './styles.scss';

function Clients() {
  const [selectedClient, setSelectedClient] = useState();
  const [search, setSearch] = useState();

  const handleSearch = useCallback(function(event) {
    setSearch(event?.target?.value || '');
  }, []);

  return (
    <div className="clients-page">
      <div className="search-bar">
        <Input type="text" icon="magnifying-glass" placeholder="Buscar por nome..." value={search} onChange={handleSearch} />
        <Button theme={Button.PRIMARY} fill={Button.SOLID} onClick={() => setSelectedClient({})}>Adicionar cliente</Button>
      </div>
      <ClientsList search={search} onClick={setSelectedClient} />
      {Boolean(selectedClient && !selectedClient.id) && (
        <ClientFormDialog client={selectedClient} onCancel={() => setSelectedClient()} />
      )}
      {Boolean(selectedClient?.id) && (
        <TransactionFormDialog client={selectedClient} onCancel={() => setSelectedClient()} />
      )}
    </div>
  );
}

export default Clients;
