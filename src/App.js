import DataProvider from './context';
import { PageHeader, PageContent, PageFooter } from 'components';

import './App.scss';

function App() {

  return (
    <DataProvider>
      <PageHeader />
      <PageContent />
      <PageFooter />
    </DataProvider>
  );
}

export default App;
