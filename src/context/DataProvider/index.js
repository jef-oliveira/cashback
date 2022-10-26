import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { Client, User } from 'models';

const CLIENT_MODELS = [Client, User];

const DataContext = React.createContext({});

export function DataProvider({ children }) {
  const [initialized, setInitialized] = useState(false);
  const [clients, setClients] = useState([]);

  const updateClients = useCallback(function(updates) {
    const { updatedClients, updatedIds } = updates.reduce((result, update) => {
      result.updatedIds.push(update.client.id);
      if (update.type !== 'removed')
        result.updatedClients.push(update.client);

      return result;
    }, { updatedClients: [], updatedIds: [] });

    setClients((clients) => [ ...clients.filter(client => !updatedIds.includes(client.id)), ...updatedClients ]);
  }, []);

  useEffect(function() {
    const unsubscribers = CLIENT_MODELS.map(Model => Model.onSnapshot((snapshot) => {
      const updates = []
      snapshot.docChanges().forEach((change) => {
        if (['added', 'modified', 'removed'].includes(change.type))
          updates.push({ type: change.type, client: new Model(change.doc) });
      });
      updateClients(updates);
      setInitialized(true);
    }))

    return () => unsubscribers.forEach(unsubscribe => unsubscribe());
  }, [updateClients]);

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