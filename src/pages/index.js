import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Home';
import Cart from './Cart';
import Wishlist from './Wishlist';
import Account from './Account';
import Config from './Config';
import Stats from './Config/Stats';
import Clients from './Config/Clients';
import Storage from './Config/Storage';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/cart", element: <Cart /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/account", element: <Account /> },
  {
    path: "/config",
    element: <Config />,
    children: [
      { path: "/config/", element: <Stats /> },
      { path: "/config/clients", element: <Clients /> },
      { path: "/config/storage", element: <Storage /> },
    ]
  }
]);

function Router() {
  return (
    <RouterProvider router={router} />
  );
}

export default Router;