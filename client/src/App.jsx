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
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction} from "./pages/Login";
import { loader as DashboardLoader } from "./pages/DashboardLayout";

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
        action:RegisterAction
      },
      {
        path: 'login',
        element: <Login />,
        action:LoginAction
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader:DashboardLoader,
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