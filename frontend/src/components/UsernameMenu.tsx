import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Separator } from "@radix-ui/react-separator";
import { CircleUser } from "lucide-react"; // Use a valid icon from lucide-react
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-sm hover:text-blue-500">
        <CircleUser className="text-blue-500 w-6 h-6" />
        <span className="font-bold">{user?.email}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white rounded-md shadow-lg p-2 min-w-[200px]"
        align="end"
      >
        <DropdownMenuItem>
          <Link
            to="/manage-restaurant"
            className="block w-full font-bold text-gray-700 hover:text-blue-600"
          >
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/user-profile"
            className="block w-full font-bold text-gray-700 hover:text-blue-600"
          >
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator className="my-2 bg-gray-200 h-[1px]" />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="w-full bg-blue-500 text-white font-bold hover:bg-blue-600"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
