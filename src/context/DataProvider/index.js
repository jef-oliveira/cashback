import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { Client, User, Product } from 'models';

const CLIENT_MODELS = [Client, User, Product];

const DataContext = React.createContext({});

export function DataProvider({ children }) {
  const [initialized, setInitialized] = useState(false);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  const updateModelState = useCallback(function({ model, updates }) {
    const { updatedModels, updatedIds } = updates.reduce((result, update) => {
      result.updatedIds.push(update.instance.id);
      if (update.type !== 'removed')
        result.updatedModels.push(update.instance);

      return result;
    }, { updatedModels: [], updatedIds: [] });

    if (model === Product.collectionPath()) {
      setProducts(currentModels => updatedList(currentModels, updatedModels, updatedIds));
    } else {
      setClients(currentModels => updatedList(currentModels, updatedModels, updatedIds));
    }
  }, []);

  useEffect(function() {
    const unsubscribers = CLIENT_MODELS.map(Model => Model.onSnapshot((snapshot) => {
      const updates = []
      snapshot.docChanges().forEach((change) => {
        if (['added', 'modified', 'removed'].includes(change.type))
          updates.push({ type: change.type, instance: new Model(change.doc) });
      });
      updateModelState({ model: Model.collectionPath(), updates });
      setInitialized(true);
    }))

    return () => unsubscribers.forEach(unsubscribe => unsubscribe());
  }, [updateModelState]);

  return (
    <DataContext.Provider value={{ initialized, clients, products }}>
      {children}
    </DataContext.Provider>
  );
}

function updatedList(currentModels, updatedModels, updatedIds) {
  return [ ...currentModels.filter(model => !updatedIds.includes(model.id)), ...updatedModels ]
}

export function useCorsServiceKey() {
  const [key, setKey] = useState(() => window.localStorage.getItem('JUST_CORS_TEMP_KEY'));

  const storeKey = useCallback(newKey => {
    window.localStorage.setItem('JUST_CORS_TEMP_KEY', newKey);
    setKey(newKey);
  }, [])

  return [key, storeKey]
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

export function useProducts(search, sorting) {
  const products = React.useContext(DataContext).products;

  const searchedProducts = useMemo(function() {
    return Product.filter(products, { by: 'title', value: search });
  }, [search, products]);

  const sortedClients = useMemo(function() {
    return Product.sort(searchedProducts, sorting || { direction: 'asc', by: 'title' });
  }, [searchedProducts, sorting]);

  return sortedClients;
}