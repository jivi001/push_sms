"use client";

import { useAuth } from "@/hooks/use-auth";
import { type Role } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShieldCheck } from "lucide-react";

export function RoleSwitcher() {
  const { user, switchRole } = useAuth();

  if (!user) return null;

  return (
    <Select
      value={user.role}
      onValueChange={(value: Role) => switchRole(value)}
    >
      <SelectTrigger className="w-[180px] h-9">
        <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-muted-foreground"/>
            <SelectValue placeholder="Switch Role" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="teacher">Teacher View</SelectItem>
        <SelectItem value="admin">Admin View</SelectItem>
        <SelectItem value="hod">HOD View</SelectItem>
      </SelectContent>
    </Select>
  );
}
