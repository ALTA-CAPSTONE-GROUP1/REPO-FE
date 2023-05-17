import { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register?: any;
  error?: string;
  valueAsNumber?: boolean;
}

export const Input: FC<Props> = (props) => {
  const { valueAsNumber, register, name, error } = props;

  return (
    <div className="w-full">
      <div
        className={`${
          error ? "tooltip tooltip-open w-full tooltip-bottom" : ""
        }`}
        data-tip={error}
      >
        <input
          className="border rounded-lg bg-white border-slate-400 text-black p-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 w-full"
          {...(register ? register(name, { valueAsNumber }) : {})}
          {...props}
        />
      </div>
    </div>
  );
};

interface PropsSelect extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  option: string;
  register?: any;
  options: { value: string; label: string }[];
  error?: string;
  valueAsNumber?: boolean;
}
export const SelectForm: FC<PropsSelect> = (props) => {
  const { label, option, name, options, register, error, defaultValue } = props;

  return (
    <div className="mt-5 w-full">
      <span className="label-text font-bold">{label}</span>
      <div
        className={`${
          error ? "tooltip tooltip-open w-full tooltip-bottom" : ""
        }`}
        data-tip={error}
      >
        <select
          {...register(name)}
          className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full"
          defaultValue={defaultValue}
        >
          <option value="" disabled>
            Select {option}
          </option>
          {options.map((pos) => (
            <option key={pos.value} value={pos.value}>
              {pos.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
