"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className=" flex items-center w-full justify-between">
      <div className="flex items-center gap-2">
        {theme !== "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        <span> { theme !== "dark" ? "Light" : 'Dark'}</span>
      </div>
      <Switch
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        checked={theme === "dark"}
      />
    </div>
  );
}
