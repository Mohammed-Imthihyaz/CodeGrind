import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { authStore } from "@/store/auth.store";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
export function Navbar() {
  const { user } = authStore();
  const navigate = useNavigate();

  const handlerProfileClick = () => {
    navigate("/profile");
  };
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <h2 className="text-lg font-semibold">
          <a href="/">CodeGrind</a>
        </h2>
        <div className="ml-auto hidden md:flex items-center space-x-4">
          <Button variant="ghost">
            <Link to="/Questions">Questions</Link>
          </Button>
          <Button variant="ghost">
            <Link to="/Review">Reviews</Link>
          </Button>
          {user == null ? (
            <Menubar className="">
              <MenubarMenu>
                <MenubarTrigger>
                  <Menu />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Link to="/login">Login</Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link to="/signup">Sign-Up</Link>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <Button variant="ghost" onClick={handlerProfileClick}>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
