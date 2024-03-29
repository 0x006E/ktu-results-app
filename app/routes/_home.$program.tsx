import {
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { useLoaderData, useNavigate, useRevalidator } from "@remix-run/react";
import { IconReload } from "@tabler/icons-react";
import { getResultAnnoucements } from "lib/api";
import { useMemo, useState } from "react";

export const loader = async ({ params }: { params: { program: string } }) => {
  return await getResultAnnoucements(parseInt(params.program));
};

function Announcements() {
  const announcements = useLoaderData<typeof loader>();
  const [page, setPage] = useState(1);
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const rowsPerPage = 4;
  const pages = Math.ceil((announcements ?? []).length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return (announcements ?? []).slice(start, end);
  }, [page, announcements]);
  return (
    <Table
      aria-label="result announcements"
      classNames={{
        table: "min-h-[222px] max-w-lg w-full",
      }}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      onRowAction={(key) => {
        const item = items.find((i) => i.id == key);
        return navigate(`details/${item?.examDefId}/${item?.schemeId}`);
      }}
    >
      <TableHeader>
        <TableColumn key="resultName">Name</TableColumn>
        <TableColumn
          key="publishDate"
          className="flex justify-between items-center"
        >
          Date
          <Tooltip content="Refresh list">
            <Button
              isIconOnly
              onClick={() => revalidator.revalidate()}
              className="ml-auto text-lg cursor-pointer active:opacity-50"
            >
              <IconReload className="w-3 h-4" />
            </Button>
          </Tooltip>
        </TableColumn>
      </TableHeader>
      <TableBody
        items={items}
        emptyContent={"No rows to display."}
        // isLoading={state == "loading" || state == "submitting"}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default Announcements;
