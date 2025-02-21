import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../components/ui/dropdown-menu";
import { useState } from "react";
import { User, LogOut } from "lucide-react";

// Define User Type
interface User {
  id: string;
  name: string;
  email: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // Null when not logged in

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-100  dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        SportsApp
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6 text-lg font-semibold">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </div>

      {/* Right Section: Dark Mode, Auth Buttons / Profile */}
      <div className="flex items-center gap-4">
        <ModeToggle />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <User className="w-5 h-5" /> {user.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setUser(null)}
                className="text-red-500 cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
