import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot, collection, query, doc, addDoc, updateDoc } from 'firebase/firestore';

import { firebaseConfig } from './config';
import Client from '../models/Client';

initializeApp(firebaseConfig);
const Firestore = getFirestore();

const DataContext = React.createContext({});

export default function DataProvider({ children }) {
  const updateClients = useRef();
  const [initialized, setInitialized] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(function() {
    const unsubscribe = onSnapshot(query(collection(Firestore, 'clients')), (snapshot) => {
      const updates = []
      snapshot.docChanges().forEach((change) => {
        if (['added', 'modified', 'removed'].includes(change.type))
          updates.push({
            type: change.type,
            client: new Client({ id: change.doc.id, ...change.doc.data() })
          });
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

  const addClient = useCallback(function(clientData) {
    const newClient = new Client(clientData);
    if (clientData.initialCashback)
      newClient.addTransaction({ date: newClient.createdAt, value: clientData.initialCashback });

    addDoc(collection(Firestore, 'clients'), newClient.props).then(docRef => {
      newClient.id = docRef.id;
      updateClients.current([{ type: 'added', client: newClient }]);
    });
  }, []);

  const editClient = useCallback(function(id, clientData) {
    const clientDoc = doc(Firestore, 'clients', id);
    const editedClient = new Client({ ...clients.find(client => client.id === id), ...clientData });
    updateDoc(clientDoc, editedClient.props);
    updateClients.current([{ type: 'modified', client: editedClient }]);
  }, [clients]);

  const addTransaction = useCallback(function(client, transactionData) {
    client.addTransaction(transactionData);
    editClient(client.id, client.props);
  }, [editClient]);

  return (
    <DataContext.Provider value={{ initialized, clients, addClient, editClient, addTransaction }}>
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
    return Client.sort(searchedClients, sorting);
  }, [searchedClients, sorting]);

  return sortedClients;
}

export function useClientOperations() {
  const { addClient, editClient, addTransaction } = React.useContext(DataContext);
  return { addClient, editClient, addTransaction };
}