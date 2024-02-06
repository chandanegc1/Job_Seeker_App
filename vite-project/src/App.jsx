import { createBrowserRouter , RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  Stats,
  AddJob,
  Admin,
  Profile,
  AllJobs,
} from './pages';

const router = createBrowserRouter([
  {
      path: '/',
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          { path: 'stats', element: <Stats /> },
          {
            path: 'all-jobs',
            element: <AllJobs />,
          },

          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);
const App = () => {
  const checkDefaultTheme = () => {
    const isDarkTheme =
      localStorage.getItem('darkTheme') === 'true'
    document.body.classList.toggle('dark-theme', isDarkTheme);
    return isDarkTheme;
  };
  
  const isDarkThemeEnabled = checkDefaultTheme();
  return <RouterProvider router={router}/>
}

export default App