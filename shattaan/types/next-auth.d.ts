import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: "CUSTOMER" | "ADMIN";
    customerId: string | null;
  }

  interface Session {
    user: {
      id: string;
      role: "CUSTOMER" | "ADMIN";
      customerId: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    role: "CUSTOMER" | "ADMIN";
    customerId: string | null;
  }
}