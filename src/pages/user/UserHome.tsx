import BounceLoader from "react-spinners/BounceLoader";
import { RiMenu2Fill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FC, ReactNode, CSSProperties } from "react";

import SubmissionType from "@/utils/types/submission";
import List from "@/components/List";
import Meta from "@/utils/types/Meta";

interface Props {
  datas: SubmissionType[];
  meta?: Meta;
  children: ReactNode;
  onchange: React.ChangeEventHandler<HTMLSelectElement>;
  onchangeInput: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClickSearch: React.MouseEventHandler<HTMLButtonElement>;
  onLoadMore: React.MouseEventHandler<HTMLButtonElement>;
  select: boolean;
  loading: boolean;
}
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const UserHome: FC<Props> = (props) => {
  const {
    datas,
    children,
    onchange,
    onchangeInput,
    loading,
    onKeyDown,
    onClickSearch,
    meta,
    onLoadMore,
  } = props;

  function isCurrentDate(dateString: string) {
    const currentDate = new Date().toISOString().slice(0, 10);
    return dateString === currentDate;
  }

  function coverTDate(datez: string) {
    const dateString = datez;
    const date = new Date(dateString);

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    } as Intl.DateTimeFormatOptions;
    return date.toLocaleDateString("en-GB", options);
  }

  return (
    <div className="drawer-content flex flex-col">
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
              selected
              value={"to"}
            >
              To
            </option>
            <option className=" text-center rounded-bl-full" value={"title"}>
              Title
            </option>
          </select>

          <label className="relative block flex-initial w-full rounded-r-full ">
            <input
              onChange={onchangeInput}
              onKeyDown={onKeyDown}
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
            <p>No Submission Yet</p>
          </div>
        ) : (
          <div>
            {datas?.map((data) => {
              return (
                <Link to={`/sub-detail/${data.id}?status=${data.status}`}>
                  <List
                    to={data.to}
                    status={data.status}
                    receive_date={
                      isCurrentDate(data.receive_date.split(" ")[0])
                        ? data.receive_date.split(" ")[1].slice(0, 8)
                        : coverTDate(data.receive_date.split(" ")[0])
                    }
                    opened={data.opened}
                    id={data.id}
                    cc={data.cc}
                    title={data.title}
                    attachment={data.attachment}
                    submission_type={data.submission_type}
                  />
                </Link>
              );
            })}
            <div className="flex w-full bg-@Red4 justify-center">
              {datas.length === meta?.current_limit ? (
                datas.length !== meta.total_data ? (
                  <button onClick={onLoadMore} className=" hover:font-bold">
                    Load more ...
                  </button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default UserHome;
