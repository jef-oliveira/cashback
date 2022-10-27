import { useState } from 'react';

import { Input, Button, ClientsList, ClientFormDialog } from 'components';

import './styles.scss';

function Clients() {
  const [selectedClient, setSelectedClient] = useState();

  return (
    <div className="clients-page">
      <div className="search-bar">
        <Input type="text" icon="magnifying-glass" placeholder="Buscar por nome..." />
        <Button theme={Button.PRIMARY} style={{ marginLeft: '8px' }}>Procurar</Button>
        <Button theme={Button.PRIMARY} fill={Button.SOLID} style={{ marginLeft: '8px' }} onClick={() => setSelectedClient({})}>Adicionar cliente</Button>
      </div>
      <ClientsList onClick={setSelectedClient} />
      {Boolean(selectedClient) && (
        <ClientFormDialog client={selectedClient} onCancel={() => setSelectedClient()} />
      )}
    </div>
  );
}

export default Clients;
