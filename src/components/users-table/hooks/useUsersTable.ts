import { useCallback, useState } from "react";

import { useToast } from "@/components/ui/use-toast";

import api from "@/infra/api";

import { User } from "@/types/users";

export type PostParams = {
  name: string;
  birthDate: Date;
};

export const useUsersTable = () => {
  const [users, setUsers] = useState<User[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { toast } = useToast();

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

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await api.get(`api/v1/users?page=${currentPage}`);

      setUsers(response.data.data);
      setTotalPages(response.data.count / 10);
      setIsLoading(false);
    } catch (e) {
      setHasError(true);
    }
  }, [currentPage]);

  const createUser = async (params: PostParams) => {
    try {
      await api.post(`api/v1/users/`, params);

      toast({
        title: "Sucesso!",
        description: "Informações atualizadas!",
      });

      fetchData();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Algo deu errado!",
        description: "Tente novamente.",
      });
    }
  };

  const updateUser = async (id: string, newName: string) => {
    try {
      await api.patch(`api/v1/users/${id}`, {
        name: newName,
      });

      toast({
        title: "Sucesso!",
        description: "Informações atualizadas!",
      });

      fetchData();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Algo deu errado!",
        description: "Tente novamente.",
      });
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await api.delete(`api/v1/users/${id}`);

      toast({
        title: "Sucesso!",
        description: "Usuário deletado!",
      });

      fetchData();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Algo deu errado!",
        description: "Tente novamente.",
      });
    }
  };

  return {
    users,
    isLoading,
    hasError,
    currentPage,
    totalPages,
    fetchData,
    createUser,
    updateUser,
    deleteUser,
    handleNextPage,
    handlePreviousPage,
  };
};
