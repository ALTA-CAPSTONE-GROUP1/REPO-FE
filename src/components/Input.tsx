import { FC, InputHTMLAttributes } from "react";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <div className="w-full">
      <input
        className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full disabled:bg-@Gray2"
        {...props}
      />
    </div>
  );
};
