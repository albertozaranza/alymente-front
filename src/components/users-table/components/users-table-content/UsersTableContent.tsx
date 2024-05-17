import { TabsContent } from "../../../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import UserInfo from "./components/user-info";

const users = [
  {
    name: "Laser",
    status: "Active",
    price: "$199.99",
    totalSales: 30,
    createdAt: "2024-02-14 02:14 PM",
  },
  {
    name: "Lemonade",
    status: "Active",
    price: "$199.99",
    totalSales: 30,
    createdAt: "2024-02-14 02:14 PM",
  },
  {
    name: "Machine",
    status: "Active",
    price: "$199.99",
    totalSales: 30,
    createdAt: "2024-02-14 02:14 PM",
  },
];

const UsersTableContent = () => {
  return (
    <TabsContent value="all">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
          <CardDescription>
            Gerencie as informações de seus usuários
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">
                  Total Sales
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(({ name, price, status, totalSales, createdAt }) => (
                <UserInfo
                  key={name}
                  name={name}
                  price={price}
                  status={status}
                  totalSales={totalSales}
                  createdAt={createdAt}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default UsersTableContent;
