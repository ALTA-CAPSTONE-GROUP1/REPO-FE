import { FC, ButtonHTMLAttributes } from "react";

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const RedButton: FC<Button> = (props) => {
  const { label } = props;

  return (
    <button
      className="py-2 px-4 m-2 w-full bg-@Red justify-center items-center gap-2 rounded-full border text-lg  disabled:bg-@Red2 text-@EBF2FA font-bold shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
      {...props}
    >
      {label}
    </button>
  );
};
export const Red2Button: FC<Button> = (props) => {
  const { label } = props;

  return (
    <button
      className="py-2 px-4 m-2 w-full bg-white justify-center items-center gap-2 rounded-full border-@Red text-lg  disabled:bg-@Red2 text-@EBF2FA font-bold shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md dark:bg-slate-700 dark:hover:bg-slate-800 dark:border-gray-900 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
      {...props}
    >
      {label}
    </button>
  );
};

export const BlueButton: FC<Button> = (props) => {
  const { label } = props;

  return (
    <button
      className="py-2 px-4 m-2 w-full bg-@Blue justify-center items-center gap-2 rounded-full border text-lg  disabled:bg-@Red2 text-@EBF2FA font-bold shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
      {...props}
    >
      {label}
    </button>
  );
};
