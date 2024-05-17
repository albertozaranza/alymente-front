import { PlusCircle } from "lucide-react";

import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TabsList, TabsTrigger } from "../../../ui/tabs";

const UsersTableHeader = () => {
  return (
    <div className="flex items-center">
      <TabsList>
        <TabsTrigger value="all">Todos</TabsTrigger>
      </TabsList>
      <div className="ml-auto flex items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Adicionar usuário
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button size="sm" className="h-8 gap-1">
                  Deletar
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UsersTableHeader;
