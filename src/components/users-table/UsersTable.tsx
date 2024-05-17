import UsersTableHeader from "./components/users-table-header";
import UsersTableContent from "./components/users-table-content";
import { Tabs } from "../ui/tabs";

const UsersTable = () => {
  return (
    <Tabs defaultValue="all">
      <UsersTableHeader />
      <UsersTableContent />
    </Tabs>
  );
};

export default UsersTable;
