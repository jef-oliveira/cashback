import { initializeApp } from 'firebase/app';

import { AuthProvider, DataProvider } from 'context';
import Router from 'pages';

import { firebaseConfig } from 'context/config';

import './App.scss';

initializeApp(firebaseConfig);

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
