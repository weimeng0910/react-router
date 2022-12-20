## React router v6.5.0

在最新的 6.5 版本中，react-router 提供了 2 种路由配置模式，jsx 和 object，object 配置形式如下：

```
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

```

如果想继续使用 jsx 的配置形式，需要通过使用 createRoutesFromElementsAPI

```
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rooter />}>
      <Route path="invoices" element={<Invoices />}>
        <Route path=":invoiceId" element={<Invoice />} />
      </Route>

      <Route path="expenses" element={<Expenses />} />

      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);
```
