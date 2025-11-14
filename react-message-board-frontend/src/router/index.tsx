import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Messages from "../pages/Messages";
import NewMessage from "../pages/NewMessage";
import Admin from "../pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // 全局布局
    children: [
      { path: "/", element: <Messages /> },
      { path: "/new", element: <NewMessage /> },
      { path: "/admin", element: <Admin /> },
    ],
  },
]);

export default router;
