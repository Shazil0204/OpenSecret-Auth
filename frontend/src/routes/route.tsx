import { createBrowserRouter } from "react-router-dom";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Signup from "../pages/Signup";
import Terms from "../pages/Terms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/terms",
    element: <Terms/>
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
