import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import FirstPage from "./components/FirstPage";
import CreateBlog from "./components/CreateBlog";
import AllBlogs from "./components/AllBlogs";
import UpdateBlog from "./components/UpdateBlog";
import Searched from "./components/Searched";
import DiffBlogs from "./components/DiffBlogs";

const router = createBrowserRouter([
  { path: "/", element: <FirstPage /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/create-blog", element: <CreateBlog /> },
  { path: "/all-blogs", element: <AllBlogs /> },
  { path: "/update/:id", element: <UpdateBlog /> },
  { path: "/user/:userName", element: <Searched /> }, 
  { path: "/user/:userName/blogs", element: <DiffBlogs /> }, 
  { path: "*", element: <h2>404 - Page Not Found</h2> }, 
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
