import { FC, InputHTMLAttributes } from "react";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <div className="w-full">
      <input
        className="border rounded-lg bg-slate-100 border-64748B text-black p-2 focus:outline-none w-full"
        {...props}
      />
    </div>
  );
};
