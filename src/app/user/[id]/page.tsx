"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUsersTable } from "@/components/users-table/hooks/useUsersTable";

type UserDetailParams = {
  params: {
    id: string;
  };
};

const UserDetail = ({ params }: UserDetailParams) => {
  const { user, getUserById } = useUsersTable();

  useEffect(() => {
    getUserById(params.id);
  }, [getUserById, params.id]);

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader className="flex flex-row">
        <div className="flex-1">
          <CardTitle>Detalhes do usuário</CardTitle>
          <CardDescription className="mt-2">
            Sabia mais sobre o usuário
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="name" className="text-right">
            Nome
          </Label>
          <Input disabled className="mt-2" defaultValue={user?.name} />
        </div>
        <div className="mt-2">
          <Label htmlFor="name" className="text-right">
            Idade
          </Label>
          <Input disabled className="mt-2" defaultValue={user?.age} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetail;
