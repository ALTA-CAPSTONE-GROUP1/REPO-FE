import { createContext, SetStateAction, Dispatch } from "react";

interface ThemeType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const theme: ThemeType = {
  theme: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: () => {},
};

export const ThemeContext = createContext(theme);
