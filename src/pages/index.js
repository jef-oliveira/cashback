import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Home';
import Account from './Account';
import Cart from './Cart';
import Cashback from './Cashback';
import Storage from './Storage';
import Wishlist from './Wishlist';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/account", element: <Account /> },
  { path: "/cart", element: <Cart /> },
  { path: "/cashback", element: <Cashback /> },
  { path: "/storage", element: <Storage /> },
  { path: "/wishlist", element: <Wishlist /> },
]);

function Router() {
  return (
    <RouterProvider router={router} />
  );
}

export default Router;