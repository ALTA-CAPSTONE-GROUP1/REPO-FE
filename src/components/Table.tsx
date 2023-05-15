import { RiDeleteBin6Line, RiPencilLine } from "react-icons/ri";
import { useTable, Column, Row } from "react-table";
import Swal from "@/utils/Swal";
import { useMemo } from "react";
import axios from "axios";

import { PositionData, UserData, OfficeData } from "@/utils/types/Admin";

type PropsTablePosition = {
  data: PositionData[];
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
            {" "}
            <button
              className="btn btn-ghost btn-xl text-xl text-@Red"
              onClick={() => handleDelete(row.original)}
            >
              <RiDeleteBin6Line />
            </button>{" "}
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
    <table className="table w-full border border-@Gray2">
      <thead {...getTableProps()}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(
              (
                column // Fix the variable name here
              ) => (
                <th {...column.getHeaderProps()} scope="col">
                  {column.render("Header")}
                </th>
              )
            )}
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
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
const handleDelete = async (data: PositionData) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover your account!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`position`, {
          headers: {
            Authorization: "your-authorization-token",
          },
        })
        .then((response) => {
          const { message } = response.data;
          Swal.fire({
            icon: "success",
            title: "Success",
            text: message,
            showCancelButton: false,
          });
        })
        .catch((error) => {
          const { data } = error.response;
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: data.message,
            showCancelButton: false,
          });
        });
    }
  });
};

// table users
type PropsTableUsers = {
  dataUsers: UserData[];
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
  const dataUsers = useMemo(() => props.dataUsers, [props.dataUsers]);

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
              onClick={() => handleDelete(row.original)}
            >
              <RiDeleteBin6Line />
            </button>
            <label
              htmlFor="my-modal-3"
              className="btn btn-ghost btn-xl text-xl text-@Blue"
            >
              <RiPencilLine />
            </label>
          </div>
        ),
      },
    ]);
  };

  const handleDelete = async (userData: UserData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`users/${userData.user_id}`, {
            headers: {
              Authorization: "your-authorization-token",
            },
          })
          .then((response) => {
            const { message } = response.data;
            Swal.fire({
              icon: "success",
              title: "Success",
              text: message,
              showCancelButton: false,
            });
          })
          .catch((error) => {
            const { data } = error.response;
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: data.message,
              showCancelButton: false,
            });
          });
      }
    });
  };

  const tableInstanceUser = useTable(
    {
      columns: columnsUser,
      data: dataUsers,
    },
    tableHooks
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstanceUser;

  const isEven = (index: number) => index % 2 == 0;
  return (
    <table className="table w-full border border-@Gray2">
      <thead {...getTableProps()}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(
              (
                column // Fix the variable name here
              ) => (
                <th {...column.getHeaderProps()} scope="col">
                  {column.render("Header")}
                </th>
              )
            )}
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
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

//office table
type PropsTableOffice = {
  data: OfficeData[];
};

const columnsOffice: readonly Column<OfficeData>[] = [
  {
    Header: "Office",
    accessor: "office_name",
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
              onClick={() => handleDelete(row.original)}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        ),
      },
    ]);
  };
  const handleDelete = async (data: OfficeData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`office`, {
            headers: {
              Authorization: "your-authorization-token",
            },
          })
          .then((response) => {
            const { message } = response.data;
            Swal.fire({
              icon: "success",
              title: "Success",
              text: message,
              showCancelButton: false,
            });
          })
          .catch((error) => {
            const { data } = error.response;
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: data.message,
              showCancelButton: false,
            });
          });
      }
    });
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
    <table className="table w-full border border-@Gray2">
      <thead {...getTableProps()}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(
              (
                column // Fix the variable name here
              ) => (
                <th {...column.getHeaderProps()} scope="col">
                  {column.render("Header")}
                </th>
              )
            )}
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
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
