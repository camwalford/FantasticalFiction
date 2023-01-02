import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import Book from "./pages/Book";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Add from "./pages/Add";
import "./styles/style.scss";

const Layout = ()=>{
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path:"/",
        element:<Home />
      },
      {
        path: "/lists",
        element: <Lists />
      },
      {
        path: "/book/:id",
        element: <Book />
      },
      {
        path: "/add",
        element: <Add />
      },
      {
        path: "/edit",
        element: <Edit />
      },
    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}



export default App;
