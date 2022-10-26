import { TextInput, Button, ClientsList } from 'components';

import './styles.scss';

function Clients() {

  return (
    <div className="clients-page">
      <div className="search-bar">
        <TextInput icon="magnifying-glass" placeholder="Buscar por nome..." />
        <Button theme={Button.PRIMARY} style={{ marginLeft: '8px' }}>Procurar</Button>
      </div>
      <ClientsList onClick={client => console.log('CLIENT', client)} />
    </div>
  );
}

export default Clients;
