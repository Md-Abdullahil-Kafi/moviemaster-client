import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import AllMovies from "../pages/AllMovies";
import MyCollection from "../pages/MyCollection";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import Home from "../pages/Home";
import MovieDetails from "../components/MovieDetails";
import UpdateMovie from "../components/UpdateMovie";
import AddMovie from "../components/AddMovie";
import NotFound from "../pages/NotFound";
import ProfileSettings from "../pages/ProfileSettings";
import PrivetRoute from "../PrivetRoute/PrivetRoute";


async function moviesLoader() {
  const res = await fetch("http://localhost:3000/allMovies");
  return res.json();
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    id: "movies-root", // 👈 এই id টা খুব দরকারি
    loader: moviesLoader, // 👈 এখানে সব movie data আসবে
    children: [
        {
            index: true,
            element: <Home></Home>
        },
        {
            path: "/allmovies",
            element: <AllMovies></AllMovies>,
            loader: ()=>fetch('http://localhost:3000/allMovies'),
        },
        {
            path: "/myCollection",
            element: <PrivetRoute><MyCollection></MyCollection></PrivetRoute>,
        },
        {
            path: "/login",
            element: <LogIn></LogIn>
        },
        {
            path: "/register",
            element: <Register></Register>
        },
        {
            path: "/movies/:id",
            element: <PrivetRoute><MovieDetails></MovieDetails></PrivetRoute>,
            loader: ({params})=> fetch(`http://localhost:3000/allMovies/${params.id}`)
            
        },
        {
            path:"/edit/:title",
            element: <PrivetRoute><UpdateMovie></UpdateMovie></PrivetRoute>
        },
        {
            path: "/add-movie",
            element: <PrivetRoute><AddMovie></AddMovie></PrivetRoute>
        },
        {
            path:"/profile-settings",
            element: <PrivetRoute><ProfileSettings /></PrivetRoute>
        }
    ]
  },
  {
    path:"*",
    element: <NotFound />
  }
]);

export default router;