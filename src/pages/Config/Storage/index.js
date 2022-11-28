import { useState, useCallback } from 'react';

import { Input, Button, ProductsList, ProductFormDialog } from 'components';

import './styles.scss';

function Clients() {
  const [selectedProduct, setSelectedProduct] = useState();
  const [search, setSearch] = useState('');

  const handleSearch = useCallback(function(event) {
    setSearch(event?.target?.value || '');
  }, []);

  return (
    <div className="storage-page">
      <div className="search-bar">
        <Input type="text" icon="magnifying-glass" placeholder="Buscar por título..." value={search} onChange={handleSearch} />
        <Button theme={Button.PRIMARY} fill={Button.SOLID} onClick={() => setSelectedProduct({})}>Adicionar produto</Button>
      </div>
      <ProductsList search={search} onClick={setSelectedProduct} />
      {Boolean(selectedProduct) && (
        <ProductFormDialog product={selectedProduct} onCancel={() => setSelectedProduct()} />
      )}
    </div>
  );
}

export default Clients;
