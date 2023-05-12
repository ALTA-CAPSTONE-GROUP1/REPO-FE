import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FC } from "react";

import Start from "@/pages";
import SubDetail from "@/pages/user/SubDetail";
import HomeAdmin from "@/pages/admin/Home";
import { Login } from "@/pages/auth/Login";
import { SignID } from "@/pages/auth/SignID";
import { Position } from "@/pages/admin/Position";
import { SubmissionType } from "@/pages/admin/SubmissionType";
import { Office } from "@/pages/admin/Office";
import { Approving } from "@/pages/admin/Approving";
import CC from "@/pages/user/CC";
import UserIndex from "@/pages/user";
import Approve from "@/pages/user/Approve";

const Router: FC = () => {
  // const [theme, setTheme] = useState<string>("light");
  // const background = useMemo(() => ({ theme, setTheme }), [theme]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Start />,
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
    {
      path: "/user/cc",
      element: <CC />,
    },
    {
      path: "/sub-detail",
      element: <SubDetail />,
    },
    {
      path: "/user",
      element: <UserIndex />,
    },
    {
      path: "/user/approve",
      element: <Approve />,
    },
  ]);

  return (
    // <ThemeContext.Provider value={background}>
    <RouterProvider router={router} />
    // </ThemeContext.Provider>
  );
};

export default Router;
