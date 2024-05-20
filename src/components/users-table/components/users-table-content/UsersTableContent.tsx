import { useLayoutEffect } from "react";
import { AlertCircle } from "lucide-react";

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import UserInfo from "./components/user-info";
import LoadingState from "./components/loading-state";

import { useUsersTable } from "../../hooks/useUsersTable";

const UsersTableContent = () => {
  const {
    users,
    isLoading,
    hasError,
    currentPage,
    totalPages,
    getUsers,
    handleNextPage,
    handlePreviousPage,
    updateUser,
    deleteUser,
  } = useUsersTable();

  useLayoutEffect(() => {
    getUsers();
  }, [getUsers]);

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
          {!hasError && (
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
          )}
        </CardHeader>
        <CardContent>
          <Table>
            {hasError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Não foi possível recuperar as informações dos usuários
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Idade
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Data de nascimento
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
                    users?.map((user) => (
                      <UserInfo
                        key={user.id}
                        user={user}
                        onEdit={updateUser}
                        onDelete={deleteUser}
                      />
                    ))
                  )}
                </TableBody>
              </>
            )}
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default UsersTableContent;
