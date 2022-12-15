import { createBrowserRouter } from 'react-router-dom';

import Error from './Error';
import Home from '@/pages/home';
import About from '@/pages/about';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

export default router;
