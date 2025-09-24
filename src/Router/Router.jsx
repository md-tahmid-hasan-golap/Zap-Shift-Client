import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home/Home/Home";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../Pages/Authintication/Login/Login";
import Register from "../Pages/Authintication/Register/Register";
import ErrorPage from "../Pages/Home/ErrorPage";
import BranchMap from "../Pages/Covarage/Covarage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import PrivateRouter from "../Routes/PrivateRouter";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoardAayouts from "../Layouts/DashBoardAayouts";
import Myparcel from "../Pages/Dashbord/Myparcel/Myparcel";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/aboutUs",
        Component: AboutUs,
      },
      {
        path: "/coverage",
        Component: BranchMap,
        loader: () => fetch("./warehouses.json"),
      },
      {
        path: "/sendParcel",
        element: (
          <PrivateRouter>
            <SendParcel></SendParcel>
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayouts,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashbord",
    element: (
      <PrivateRouter>
        <DashBoardAayouts />
      </PrivateRouter>
    ),
    children: [
      {
        path: "myParcel", // ✅ relative path
        element: <Myparcel />,
      },
    ],
  },
]);

export default router;
