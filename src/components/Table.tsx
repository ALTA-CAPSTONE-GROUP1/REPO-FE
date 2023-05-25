/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiDeleteBin6Line, RiPencilLine } from "react-icons/ri";
import { useTable, Column, Row } from "react-table";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import {
  SubmissionDetail,
  PositionData,
  OfficeData,
  UserData,
} from "@/utils/types/Admin";

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
