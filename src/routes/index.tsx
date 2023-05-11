import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useMemo } from "react";
import { FC } from "react";
import { ThemeContext } from "@/utils/context";

import Home from "@/pages";
import HomeAdmin from "@/pages/admin/Home";
import { Login } from "@/pages/auth/Login";
import { SignID } from "@/pages/auth/SignID";

const Router: FC = () => {
  // const [theme, setTheme] = useState<string>("light");
  // const background = useMemo(() => ({ theme, setTheme }), [theme]);

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
      path: "/sign-id",
      element: <SignID />,
    },
    {
      path: "/admin",
      element: <HomeAdmin />,
    },
  ]);

  return (
    // <ThemeContext.Provider value={background}>
    <RouterProvider router={router} />
    // </ThemeContext.Provider>
  );
};

export default Router;
