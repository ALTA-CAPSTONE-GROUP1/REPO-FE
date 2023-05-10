import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useMemo } from "react";
import { FC } from "react";
import Home from "@/pages";
import { ThemeContext } from "@/utils/context";

const Router: FC = () => {
  const [theme, setTheme] = useState<string>("dark");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <ThemeContext.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default Router;
