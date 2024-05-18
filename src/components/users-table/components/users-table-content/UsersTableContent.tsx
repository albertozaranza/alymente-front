import { useLayoutEffect, useState } from "react";

import { TabsContent } from "../../../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
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

import api from "@/infra/api";

import { User } from "@/types/users";
import LoadingState from "./components/loading-state";

const UsersTableContent = () => {
  const [users, setUsers] = useState<User[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useLayoutEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const response = await api.get(`api/v1/users?page=${currentPage}`);

        setUsers(response.data.data);
        setTotalPages(response.data.count / 10);

        setIsLoading(false);
      } catch (e) {
        setHasError(true);
      }
    })();
  }, [currentPage]);

  if (hasError) {
    return <Card x-chunk="dashboard-06-chunk-0">Error</Card>;
  }

  return (
    <TabsContent value="all">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className="flex flex-row">
          <div className="flex-1">
            <CardTitle>Usuários</CardTitle>
            <CardDescription className="mt-2">
              Gerencie as informações de seus usuários
            </CardDescription>
          </div>
          <Pagination className="flex-0 w-min">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePreviousPage}
                  href="#"
                  className={
                    currentPage <= 1
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">{currentPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={handleNextPage}
                  href="#"
                  className={
                    currentPage >= totalPages
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">
                  Data de criação
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <LoadingState />
              ) : (
                users?.map(({ name, createdAt }) => (
                  <UserInfo key={name} name={name} createdAt={createdAt} />
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default UsersTableContent;
