import Details from '@/pages/Details';
import Home from '@/pages/Home';
import Order from '@/pages/Order';
import Product from '@/pages/Product';
import LayoutProvider from '@/providers/LayoutProvider';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutProvider />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/details/:id',
        element: <Details />
      },
      {
        path: '/order',
        element: <Order />
      },
      {
        path: '/products',
        element: <Product />
      }
    ]
  },

])