import Details from '@/pages/Details';
import Home from '@/pages/Home';
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
      }
    ]
  },

])