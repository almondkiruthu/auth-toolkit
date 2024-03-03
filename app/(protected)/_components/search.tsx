"use client";

import { User as Student } from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { UserInfo } from "@/components/user-info";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";

interface SearchInputProps {
  users?: User[];
}
export const SearchInput = ({ users }: SearchInputProps) => {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type user name to search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup
          heading="Users"
          className="flex flex-col space-y-4 bg-white p-4"
        >
          {users?.map((user) => (
            <CommandItem
              key={user.id}
              className="flex items-center justify-between bg-white p-2"
            >
              <Student className="h-6 w-6 text-primary" />
              <div className="flex items-center gap-x-8">
                <p className="font-heading text-lg">{user.name}</p>
                {!user.regNo ? (
                  <Skeleton className="h-4 w-full" />
                ) : (
                  <span className="text-sm">{user.regNo}</span>
                )}
                {!user.regNo ? (
                  <Skeleton className="h-4 w-full" />
                ) : (
                  <span className="text-sm">{user.mobileNumber}</span>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
};
