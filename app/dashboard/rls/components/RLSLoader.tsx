import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RLSLoader() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Session ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Resolution</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(10)].map((_, index) => (
            <TableRow key={index} className="border-b border-gray-200">
              <TableCell>
                <Skeleton className="h-6 w-full rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-full rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-full rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-full rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-full rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-full rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-full rounded" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
