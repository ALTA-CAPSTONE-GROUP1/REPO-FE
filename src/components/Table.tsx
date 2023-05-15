import { useMemo } from "react";
import { useTable, Column, Row } from "react-table";
import { PositionData } from "@/utils/types/Admin";
import { RiDeleteBin6Line } from "react-icons/ri";

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
              onClick={() => alert(`Delete: ${row.values.tag}`)}
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
      <thead>
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
