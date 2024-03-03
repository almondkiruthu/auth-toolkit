import NextAuth, { type DefaultSession } from "next-auth";

import { UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  mobileNumber: string;
  address: string;
  regNo: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
