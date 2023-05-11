import { FC, ButtonHTMLAttributes } from "react";

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const RedButton: FC<Button> = (props) => {
  const { label } = props;

  return (
    <button
      className="py-2 px-4 w-full bg-@Red justify-center items-center gap-2 rounded-full border text-lg  disabled:bg-@Red2 text-white font-bold shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md"
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
      className="py-2 px-4 w-full bg-white justify-center items-center gap-2 rounded-full border-2 border-@Red text-lg  disabled:bg-@Red2 text-@Red font-bold shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md"
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
      className="py-2 px-4 w-full bg-@Blue justify-center items-center gap-2 rounded-full text-lg  disabled:bg-@Gray text-white font-bold shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md"
      {...props}
    >
      {label}
    </button>
  );
};
