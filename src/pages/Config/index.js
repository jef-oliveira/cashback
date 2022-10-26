import { Outlet } from 'react-router-dom';

import { Page, NavigationList } from 'components';

import './styles.scss';

function Config() {
  return (
    <Page className="config-page" adminOnly>
      <NavigationList>
        <NavigationList.Item icon="user-group" title="Clientes" to="clients" />
        <NavigationList.Item icon="box" title="Estoque" to="storage" />
      </NavigationList>
      <Outlet />
    </Page>
  );
}

export default Config;
