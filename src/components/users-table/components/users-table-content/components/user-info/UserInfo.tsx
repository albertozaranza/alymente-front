import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { User } from "@/types/users";
import { MultiDialogProvider } from "@/components/ui/multi-dialog";

type UserInfoProps = {
  user: User;
  onEdit: (id: string, name: string) => void;
  onDelete: (id: string) => void;
};

enum dialogs {
  Edit = 1,
  Delete = 2,
}

const UserInfo = ({ user, onEdit, onDelete }: UserInfoProps) => {
  const [newName, setNewName] = useState("");

  const { id, name, age, birthDate } = user;

  return (
    <MultiDialogProvider<dialogs>>
      {({ Trigger, Container }) => (
        <TableRow>
          <TableCell className="font-medium">{id}</TableCell>
          <TableCell className="font-medium">{name}</TableCell>
          <TableCell className="hidden md:table-cell">{age}</TableCell>
          <TableCell className="hidden md:table-cell">
            {birthDate ? new Date(birthDate).toLocaleDateString() : "-"}
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={`/user/${id}`}>
                  <DropdownMenuItem>Detalhes</DropdownMenuItem>
                </Link>
                <Trigger value={dialogs.Edit}>
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                </Trigger>

                <Trigger value={dialogs.Delete}>
                  <DropdownMenuItem>Excluir</DropdownMenuItem>
                </Trigger>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
          <Container value={dialogs.Edit}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Editar nome</DialogTitle>
                <DialogDescription>
                  Atualize o nome de seu usuário rapidamente aqui. Clique em
                  salvar quando terminar.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    defaultValue={name}
                    onChange={(e) => setNewName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Trigger value={dialogs.Edit}>
                  <Button type="submit" onClick={() => onEdit(id, newName)}>
                    Salvar
                  </Button>
                </Trigger>
              </DialogFooter>
            </DialogContent>
          </Container>
          <Container value={dialogs.Delete}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Você tem certeza?</DialogTitle>
                <DialogDescription>
                  Esta ação não pode ser desfeita. Isto irá remover os dados
                  permanentemente.
                </DialogDescription>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={() => onDelete(id)}
                    size="sm"
                    className="h-8 gap-1"
                  >
                    Deletar
                  </Button>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Container>
        </TableRow>
      )}
    </MultiDialogProvider>
  );
};

export default UserInfo;
