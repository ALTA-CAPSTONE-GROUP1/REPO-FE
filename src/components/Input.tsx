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
      {error ? (
        <div className="tooltip tooltip-open" data-tip={error}>
          <input
            className="border rounded-lg bg-slate-100 border-slate-400 text-black p-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 w-full"
            {...(register ? register(name) : {})}
            {...props}
          />
        </div>
      ) : (
        <input
          className="border rounded-lg bg-slate-100 border-slate-400 text-black p-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 w-full"
          {...(register ? register(name) : {})}
          {...props}
        />
      )}

      {/* {error && (
        <label className="label">
          <span className="font-light text-sm text-red-500 break-words">
            {error}
          </span>
        </label>
      )} */}
    </div>
  );
};
