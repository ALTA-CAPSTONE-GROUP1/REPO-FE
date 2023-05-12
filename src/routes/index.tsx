import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FC } from "react";

import Start from "@/pages";
import SubDetail from "@/pages/user/SubDetail";
import HomeAdmin from "@/pages/admin/Home";
import Profile from "@/pages/user/Profile";
import { Login } from "@/pages/auth/Login";
import { SignID } from "@/pages/auth/SignID";
import { Position } from "@/pages/admin/Position";
import { SubmissionType } from "@/pages/admin/SubmissionType";
import { Office } from "@/pages/admin/Office";
import { Approving } from "@/pages/admin/Approving";
import ApproveDetail from "@/pages/user/ApproveDetail";
import CC from "@/pages/user/CC";
import UserIndex from "@/pages/user";
import Approve from "@/pages/user/Approve";
import App from "@/pages/App";
import DrawCanvasExample from "@/pages/DrawCanvasExample";
import WaterMarkExample from "@/pages/WaterMarkExample";
import ModalExample from "@/pages/ModalExample";

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
      path: "/home",
      element: <UserIndex />,
    },
    {
      path: "/approve",
      element: <Approve />,
    },
    {
      path: "/cc",
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
      path: "/approve-detail",
      element: <ApproveDetail />,
    },
    {
      path: "/profile-users",
      element: <Profile />,
    },
    {
      path: "/app",
      element: <App />,
    },
    {
      path: "/app2",
      element: <DrawCanvasExample />,
    },
    {
      path: "/app3",
      element: <WaterMarkExample fileUrl="/images/test2.pdf" />,
    },
    {
      path: "/app4",
      element: <ModalExample fileUrl="/images/test2.pdf" />,
    },
  ]);

  return (
    // <ThemeContext.Provider value={background}>
    <RouterProvider router={router} />
    // </ThemeContext.Provider>
  );
};

export default Router;
