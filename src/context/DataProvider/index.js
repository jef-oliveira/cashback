import React, { useState, useRef, useEffect, useMemo } from 'react';

import { Client } from 'models';

const DataContext = React.createContext({});

export function DataProvider({ children }) {
  const updateClients = useRef();
  const [initialized, setInitialized] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(function() {
    const unsubscribe = Client.onSnapshot((snapshot) => {
      const updates = []
      snapshot.docChanges().forEach((change) => {
        if (['added', 'modified', 'removed'].includes(change.type))
          updates.push({ type: change.type, client: new Client(change.doc) });
      });
      updateClients.current(updates);
      setInitialized(true);
    });

    return unsubscribe;
  }, []);

  useEffect(function() {
    updateClients.current = function(updates) {
      const { updatedClients, updatedIds } = updates.reduce((result, update) => {
        result.updatedIds.push(update.client.id);
        if (update.type !== 'removed')
          result.updatedClients.push(update.client);

        return result;
      }, { updatedClients: [], updatedIds: [] });

      const newList = [ ...clients.filter(client => !updatedIds.includes(client.id)), ...updatedClients ];
      setClients(newList);
    };
  }, [clients]);

  return (
    <DataContext.Provider value={{ initialized, clients }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataInitialized() {
  const { initialized } = React.useContext(DataContext);
  return initialized;
}

export function useClients(search, sorting) {
  const clients = React.useContext(DataContext).clients;

  const searchedClients = useMemo(function() {
    return Client.filter(clients, { by: 'name', value: search });
  }, [search, clients]);

  const sortedClients = useMemo(function() {
    return Client.sort(searchedClients, sorting || { direction: 'asc', by: 'name' });
  }, [searchedClients, sorting]);

  return sortedClients;
}