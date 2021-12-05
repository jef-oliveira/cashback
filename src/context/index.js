import React, { useState, useCallback, useMemo } from 'react';

import Client from '../models/Client';

const DataContext = React.createContext({});

function DataProvider({ children }) {
  const [clients, setClients] = useState([]);

  const addClient = useCallback(function(clientData) {
    const newClient = new Client(clientData);
    if (clientData.initialCashback)
      newClient.addTransaction({ date: newClient.creationDate, value: clientData.initialCashback });

    setClients([ ...clients, newClient ]);
  }, [clients]);

  const editClient = useCallback(function(id, clientData) {
    const editedClient = new Client({ ...clients.find(client => client.id === id), ...clientData });
    setClients([ ...clients.filter(client => client.id !== id), editedClient ]);
  }, [clients]);

  const addTransaction = useCallback(function(client, transactionData) {
    client.addTransaction(transactionData);
    const editedClient = new Client({ ...clients.find(({ id }) => client.id === id), ...client });
    setClients([ ...clients.filter(({ id }) => client.id !== id), editedClient ]);
  }, [clients]);

  return (
    <DataContext.Provider value={{ clients, addClient, editClient, addTransaction }}>
      {children}
    </DataContext.Provider>
  );
}

export function useClients(search, sorting) {
  const clients = React.useContext(DataContext).clients;

  const searchedClients = useMemo(function() {
    return Client.filter(clients, { by: 'name', value: search });
  }, [search, clients]);

  const sortedClients = useMemo(function() {
    return Client.sort(searchedClients, sorting);
  }, [searchedClients, sorting]);

  return sortedClients;
}

export function useClientOperations() {
  const { addClient, editClient, addTransaction } = React.useContext(DataContext);
  return { addClient, editClient, addTransaction };
}

export default DataProvider;