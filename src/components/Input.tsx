import { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register?: any;
  error?: string;
}

export const Input: FC<Props> = (props) => {
  const { placeholder, register, name, error } = props;

  return (
    <div className="w-full">
      <input
        className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full"
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && (
        <label className="label">
          <span className="font-light text-sm text-red-500 break-words">
            {error}
          </span>
        </label>
      )}
    </div>
  );
};
