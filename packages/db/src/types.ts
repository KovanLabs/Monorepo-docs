export interface User {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserInput = Pick<
  User,
  "email" | "username" | "passwordHash" | "role"
>;

export type PublicUser = Omit<User, "passwordHash">;
