import { useCallback } from 'react';

import { Icon } from 'components';

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
        <Icon name={icon} className="column-icon" />
        {label}
        {sorting.by === column && (
          <Icon name={`caret-${sorting.direction === 'asc' ? 'down' : 'up'}`} className="sorting-icon" />
        )}
      </h3>
    </th>
  );
}

export default ListHead;