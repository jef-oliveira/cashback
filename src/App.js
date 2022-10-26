import Firebase from 'fb';
import { AuthProvider, DataProvider } from 'context';
import Router from 'pages';

Firebase.initialize();

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
