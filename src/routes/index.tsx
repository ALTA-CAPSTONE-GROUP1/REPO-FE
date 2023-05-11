import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useMemo } from "react";
import { FC } from "react";
import { ThemeContext } from "@/utils/context";

import Home from "@/pages";
import HomeAdmin from "@/pages/admin/Home";
import { Login } from "@/pages/auth/Login";
import { SignID } from "@/pages/auth/SignID";
import { Position } from "@/pages/admin/Position";
import { SubmissionType } from "@/pages/admin/SubmissionType";
import { Office } from "@/pages/admin/Office";
import { Approving } from "@/pages/admin/Approving";

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
    {
      path: "/position",
      element: <Position />,
    },
    {
      path: "/submission-type",
      element: <SubmissionType />,
    },
    {
      path: "/office",
      element: <Office />,
    },
    {
      path: "/approving",
      element: <Approving />,
    },
  ]);

  return (
    // <ThemeContext.Provider value={background}>
    <RouterProvider router={router} />
    // </ThemeContext.Provider>
  );
};

export default Router;
