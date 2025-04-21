"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuLeaf } from "react-icons/lu";
import { useTheme } from "@/context/ThemeProvider";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all ${
              theme === "light" ? "rotate-0 scale-100" : "scale-0"
            }`}
          />
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
              theme === "dark" ? "rotate-0 scale-100" : "scale-0"
            }`}
          />
          <LuLeaf
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
              theme === "rustic" ? "rotate-0 scale-100" : "scale-0"
            }`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex gap-1"
        >
          <span>Claro</span>
          <Sun />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex gap-1"
        >
          <span>Oscuro</span>
          <Moon />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("rustic")}
          className="flex gap-1"
        >
          <span>Rustico</span>
          <LuLeaf />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
