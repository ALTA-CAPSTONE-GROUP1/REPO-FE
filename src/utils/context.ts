import { createContext, SetStateAction, Dispatch } from "react";

interface ThemeType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const theme: ThemeType = {
  theme: "",
<<<<<<< HEAD
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: () => {},
=======
  setTheme: () => {
    "autumn";
  },
>>>>>>> 0e8045ce691bd5600820b6838b3bdedc89ec3d2b
};

export const ThemeContext = createContext(theme);
