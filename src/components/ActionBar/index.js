import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../Button';
import Input from '../Input';

import './styles.css';

function ActionBar({ onSearch, onAddClient, className, ...props }) {
  const [search, setSearch] = useState('');

  const handleSearch = useCallback(function(event) {
    setSearch(event?.target?.value || '');

    if (onSearch) {
      const searchValue = event?.target?.value?.trim();
      onSearch(searchValue?.length ? searchValue : '');
    }
  }, [onSearch]);

  const handleClear = useCallback(function(event) {
    handleSearch();
  }, [handleSearch]);

  return (
    <section className={`action-bar${className ? ` ${className}` : ''}`} { ...props }>
      <Input icon="search" type="text" placeholder="Buscar por nome..." value={search} onChange={handleSearch} />
      {search.trim().length > 0 && (
        <FontAwesomeIcon icon={["fas", "times-circle"]} className="clear-icon" onClick={handleClear}/>
      )}
      <Button theme="primary" onClick={onAddClient}>Adicionar cliente</Button>
    </section>
  );
}

export default ActionBar;
