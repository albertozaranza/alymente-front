import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const LoadingState = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      {arr.map((key) => (
        <TableRow key={key}>
          <TableCell className="font-medium">
            <Skeleton className="h-8 w-[100px]" />
          </TableCell>
          <TableCell className="font-medium">
            <Skeleton className="h-8 w-[100px]" />
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-8 w-[100px]" />
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-8 w-[100px]" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default LoadingState;
