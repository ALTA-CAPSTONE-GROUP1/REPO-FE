import BounceLoader from "react-spinners/BounceLoader";
import { RiMenu2Fill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { FC, CSSProperties } from "react";
import { Link } from "react-router-dom";

import CCList from "@/components/CCList";
import ccTypes from "@/utils/types/cc";

interface Props {
  datas: ccTypes[];
  onchange: React.ChangeEventHandler<HTMLSelectElement>;
  onchangeInput: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClickSearch: React.MouseEventHandler<HTMLButtonElement>;
  select: boolean;
  loading: boolean;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const CC: FC<Props> = (props) => {
  const { datas, onchange, onchangeInput, loading, onKeyDown, onClickSearch } =
    props;

  return (
    <div className="drawer-content flex flex-col h-[90%]">
      <div className="p-7 w-full">
        <label
          htmlFor="my-drawer-2"
          className="btn  drawer-button lg:hidden bg-@Red text-white border-@Red mb-5"
        >
          <RiMenu2Fill />
        </label>
        <div className="form-control rounded-full flex flex-row relative border-2">
          <select
            onChange={onchange}
            className=" bg-@Red flex-initial w-[10%] rounded-l-full focus:rounded-none transition-all ease-in-out flex justify-center items-center"
          >
            <option
              className=" text-center rounded-tl-full"
              value={"to"}
              selected
            >
              To
            </option>
            <option className=" text-center rounded-bl-full" value={"title"}>
              Title
            </option>
            <option className=" text-center rounded-bl-full" value={"from"}>
              From
            </option>
            <option className=" text-center rounded-bl-full" value={"type"}>
              Type
            </option>
          </select>

          <label className="relative block flex-initial w-full rounded-r-full ">
            <input
              onKeyDown={onKeyDown}
              onChange={onchangeInput}
              className="rounded-r-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-@Red focus:ring-@Red focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
            />
            <button
              className="absolute inset-y-0 right-4 flex justify-end items-center pl-2"
              onClick={onClickSearch}
            >
              <BsSearch className="h-5 w-5 font-bold hover:w-8 hover:h-8 transition-all" />
            </button>
          </label>
        </div>
      </div>
      <div className="h-full overflow-auto  min-w-[50rem]">
        {loading ? (
          <div className="sweet-loading w-full h-full flex justify-center items-center">
            <BounceLoader
              color={"#E9AAB3"}
              loading={loading}
              cssOverride={override}
              size={120}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : datas.length == 0 ? (
          <div className=" w-full h-full flex justify-center items-center text-4xl font-bold text-@Gray">
            <p>No Submission was Cc to you</p>
          </div>
        ) : (
          datas?.map((data) => {
            return (
              <Link to={""}>
                <CCList
                  submission_id={data.submission_id}
                  from={data.from}
                  to={data.to}
                  title={data.title}
                  submission_type={data.submission_type}
                  attachment={data.attachment}
                />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default CC;
