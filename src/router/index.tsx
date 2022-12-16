import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Rooter from '@/router/router';
import Invoices from '@/pages/invoices';
import Expenses from '@/pages/expenses';
import ErrorPage from '@/router/Error';
const router = createBrowserRouter([
  //1.路由嵌套
  {
    path: '/', //根路由
    element: <Rooter />,
    errorElement: <ErrorPage />,
    //子路由
    children: [
      {
        path: '/invoices',
        element: <Invoices />,
      },
      {
        path: '/expenses',
        element: <Expenses />,
      },
    ],
  },
]);
function Root() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Root;
