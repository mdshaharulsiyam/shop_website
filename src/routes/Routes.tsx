import Checkout from '@/pages/Checkout';
import Contact from '@/pages/Contact';
import Details from '@/pages/Details';
import Home from '@/pages/Home';
import Order from '@/pages/Order';
import Privacy from '@/pages/Privacy';
import Product from '@/pages/Product';
import Terms from '@/pages/Terms';
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
      },
      {
        path: '/privacy',
        element: <Privacy />
      },
      {
        path: "/terms",
        element: <Terms />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/checkout",
        element: <Checkout />
      },
    ]
  },

])