import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useMemo } from "react";
import { FC } from "react";
import { ThemeContext } from "@/utils/context";

import Home from "@/pages";
import SubDetail from "@/pages/SubDetail";
import UserHome from "@/pages/UserHome";
import Admin from "@/pages/admin/Home";
import ApproveDetail from "@/pages/ApproveDetail";
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
      element: <Admin />,
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
    {
      path: "/user",
      element: <UserHome />,
    },
    {
      path: "/sub-detail",
      element: <SubDetail />,
    },
    {
      path: "/approve-detail",
      element: <ApproveDetail />,
    },
  ]);

  return (
    // <ThemeContext.Provider value={background}>
    <RouterProvider router={router} />
    // </ThemeContext.Provider>
  );
};

export default Router;
