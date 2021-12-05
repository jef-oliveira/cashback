import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { COLUMNS } from './';

function ListHead({ sorting, onSort }) {
  return (
    <tr>
      {COLUMNS.map((column, index) => (
        <TableHead key={index} { ...column } sorting={sorting} onSort={onSort} />
      ))}
    </tr>
  );
}

function TableHead({ column, icon, label, sorting, onSort }) {
  const handleSort = useCallback(function() {
    if (onSort)
      onSort({ by: column, direction: (sorting.by !== column || sorting.direction === 'desc') ? 'asc' : 'desc' });
  }, [column, sorting, onSort]);

  return (
    <th>
      <h3 onClick={handleSort}>
        <FontAwesomeIcon icon={['fas', icon]} className="column-icon" />
        {label}
        {sorting.by === column && (
          <FontAwesomeIcon icon={['fas', `caret-${sorting.direction === 'asc' ? 'down' : 'up'}`]} className="sorting-icon" />
        )}
      </h3>
    </th>
  );
}

export default ListHead;