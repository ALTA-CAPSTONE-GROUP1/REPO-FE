/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiDeleteBin6Line, RiPencilLine } from "react-icons/ri";
import { useTable, Column, Row } from "react-table";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import {
  SubmissionDetail,
  PositionData,
  OfficeData,
  UserData,
} from "@/utils/types/Admin";
import { BsSearch } from "react-icons/bs";

type PropsTablePosition = {
  data: PositionData[];
  onClickDelete: (id: number) => void;
};
const columns: readonly Column<PositionData>[] = [
  {
    Header: "Position",
    accessor: "position",
  },
  {
    Header: "Tag",
    accessor: "tag" as const,
  },
];

export function TablePosition(props: PropsTablePosition) {
  const data = useMemo(() => props.data, [props.data]);
  const [searchQuery, setSearchQuery] = useState("");

  const tableHooks = (hooks: any) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        id: "Delete",
        Header: <div className="flex pr-3 justify-end">Action</div>,
        Cell: ({ row }: { row: Row<PositionData> }) => (
          <div className="flex pr-3 justify-end">
            <button
              className="btn btn-ghost btn-xl text-xl text-@Red"
              onClick={() => props.onClickDelete(row.original.position_id)}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        ),
      },
    ]);
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    tableHooks
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const isEven = (index: number) => index % 2 == 0;

  return (
    <>
      <div className="flex flex-row p-2 bg-@Red2 text-black rounded-ss-md rounded-se-md justify-between items-center">
        <p className="font-bold">Position List</p>
        <label className="relative block flex-initial w-64 rounded-full ">
          <input
            className="rounded-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-@Red focus:ring-@Red focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 right-4 flex justify-end items-center pl-2">
            <BsSearch className="h-5 w-5 font-bold" />
          </span>
        </label>
      </div>
      <table className="table w-full border border-@Gray2">
        <thead {...getTableProps()}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} scope="col">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <tr
                {...row.getRowProps()}
                className={isEven(index) ? "bg-@Gray" : ""}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

// table users
type PropsTableUsers = {
  dataUsers: UserData[];
  onclickDelete: (id: string) => void;
};

const columnsUser: readonly Column<UserData>[] = [
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => (
      <div>
        <div className="font-bold text-black">{row.values.name}</div>
        <div className="text-sm opacity-80 text-@Gray">
          {row.values.user_id}
        </div>
      </div>
    ),
  },
  {
    Header: "ID",
    accessor: "user_id",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Position",
    accessor: "position",
  },
  {
    Header: "Office",
    accessor: "office",
  },
];

export function TableUsers(props: PropsTableUsers) {
  const data = useMemo(() => props.dataUsers, [props.dataUsers]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const tableHooks = (hooks: any) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        id: "action",
        Header: <div className="flex pr-3 justify-center">Action</div>,
        Cell: ({ row }: { row: Row<UserData> }) => (
          <div className="flex pr-3 justify-center">
            <button
              className="btn btn-ghost btn-xl text-xl text-@Red"
              onClick={() => props.onclickDelete(row.original.user_id)}
            >
              <RiDeleteBin6Line />
            </button>
            <button
              className="btn btn-ghost btn-xl text-xl text-@Blue"
              onClick={() => navigate(`/update-users/${row.values.user_id}`)}
            >
              <RiPencilLine />
            </button>
          </div>
        ),
      },
    ]);
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const tableInstanceUser = useTable(
    {
      columns: columnsUser,
      data,
    },
    tableHooks
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstanceUser;

  const isEven = (index: number) => index % 2 == 0;
  return (
    <>
      <div className="flex flex-row p-2 bg-@Red2 text-black rounded-ss-md rounded-se-md justify-between items-center">
        <p className="font-bold">Users List</p>
        <label className="relative block flex-initial w-64 rounded-full ">
          <input
            className="rounded-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-@Red focus:ring-@Red focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 right-4 flex justify-end items-center pl-2">
            <BsSearch className="h-5 w-5 font-bold" />
          </span>
        </label>
      </div>
      <table className="table w-full border border-@Gray2">
        <thead {...getTableProps()}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} scope="col">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <tr
                {...row.getRowProps()}
                className={isEven(index) ? "bg-@Gray" : ""}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

//office table
type PropsTableOffice = {
  data: OfficeData[];
  onClickDelete: (id: number) => void;
};

const columnsOffice: readonly Column<OfficeData>[] = [
  {
    Header: "Office",
    accessor: "Name",
  },
];

export function TableOffice(props: PropsTableOffice) {
  const data = useMemo(() => props.data, [props.data]);
  const [searchQuery, setSearchQuery] = useState("");

  const tableHooks = (hooks: any) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        id: "Delete",
        Header: <div className="flex pr-3 justify-end">Action</div>,
        Cell: ({ row }: { row: Row<OfficeData> }) => (
          <div className="flex pr-3 justify-end">
            <button
              className="btn btn-ghost btn-xl text-xl text-@Red"
              onClick={() => props.onClickDelete(row.original.ID)}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        ),
      },
    ]);
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const tableInstance = useTable(
    {
      columns: columnsOffice,
      data,
    },
    tableHooks
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const isEven = (index: number) => index % 2 == 0;
  return (
    <>
      <div className="flex flex-row p-2 bg-@Red2 text-black rounded-ss-md rounded-se-md justify-between items-center">
        <p className="font-bold">Office List</p>
        <label className="relative block flex-initial w-64 rounded-full ">
          <input
            className="rounded-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-@Red focus:ring-@Red focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 right-4 flex justify-end items-center pl-2">
            <BsSearch className="h-5 w-5 font-bold" />
          </span>
        </label>
      </div>
      <table className="table w-full border border-@Gray2">
        <thead {...getTableProps()}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} scope="col">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <tr
                {...row.getRowProps()}
                className={isEven(index) ? "bg-@Gray" : ""}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

//TABLE SUBMISSION TYPE
interface PropsSubmissionProps {
  data: SubmissionDetail[];
  onClickDelete: (submissionTypeName: string) => void;
}

const columnsSubmission: Column<SubmissionDetail>[] = [
  {
    Header: "Submission Name",
    accessor: "submission_type_name",
  },
  {
    Header: "Value",
    accessor: "submission_value",
  },
  {
    Header: "Requirement",
    accessor: "submission_requirement",
  },
];

export function TableSubmission(props: PropsSubmissionProps) {
  const data = useMemo(() => props.data, [props.data]);
  const [searchQuery, setSearchQuery] = useState("");

  const tableHooks = (hooks: any) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        id: "Delete",
        Header: <div className="flex pr-3 justify-end">Action</div>,
        Cell: ({ row }: { row: Row<SubmissionDetail> }) => (
          <div className="flex pr-3 justify-end">
            <button
              className="btn btn-ghost btn-xl text-xl text-@Red"
              onClick={() =>
                props.onClickDelete(row.original.submission_type_name)
              }
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        ),
      },
    ]);
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const tableInstance = useTable(
    {
      columns: columnsSubmission,
      data,
    },
    tableHooks
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const isEven = (index: number) => index % 2 === 0;

  return (
    <>
      <div className="flex flex-row p-2 bg-@Red2 text-black rounded-ss-md rounded-se-md justify-between items-center">
        <p className="font-bold">Submission List</p>
        <label className="relative block flex-initial w-64 rounded-full ">
          <input
            className="rounded-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-@Red focus:ring-@Red focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 right-4 flex justify-end items-center pl-2">
            <BsSearch className="h-5 w-5 font-bold" />
          </span>
        </label>
      </div>
      <table className="table w-full border border-@Gray2">
        <thead {...getTableProps()}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} scope="col">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <tr
                {...row.getRowProps()}
                className={isEven(index) ? "bg-@Gray" : ""}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
