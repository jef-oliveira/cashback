import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import Home from './Home';
import Wishlist from './Wishlist';
import Account from './Account';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/account", element: <Account /> }
]);

function Router() {
  return (
    <RouterProvider router={router} />
  );
}

export default Router;