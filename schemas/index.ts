import * as z from "zod";

const sanitizeString = (str: string) => str.replace(/['";]/g, '');

enum UserRole {
  ADMIN = 'admin',
  BIDDER = 'bidder',
  SELLER = 'seller'
}

export const SignInSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email().max(100).transform(sanitizeString),
  password: z.string().min(1, { message: "Password is required" }).transform(sanitizeString),
});

export const RegisterSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }).max(50).transform(sanitizeString),
  email: z.string().min(1, { message: "Email is required" }).email().max(100).transform(sanitizeString),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }).transform(sanitizeString),
  role: z.string().refine((val) => Object.values(UserRole).includes(val as UserRole), {
    message: "Role must be one of Customer, or Seller",
  }).default(UserRole.BIDDER),
  isActive: z.optional(z.boolean()).default(true),
});


/*import * as z from "zod";

// Helper function to sanitize strings
const sanitizeString = (str: string) => str.replace(/['";]/g, '');

// Define the UserRole enum manually since we are not using Prisma
enum UserRole {
  ADMIN = 'admin',
  BIDDER = 'bidder',
  SELLER = 'seller'
}

// User schema for validation
export const UserSchema = z.object({
  username: z.string().max(50).transform(sanitizeString),
  email: z.string().email().max(100).transform(sanitizeString),
  password: z.string().min(6).transform(sanitizeString),
  role: z.enum([UserRole.ADMIN, UserRole.BIDDER, UserRole.SELLER]),
  isActive: z.optional(z.boolean()),
  createdAt: z.optional(z.string().transform(sanitizeString)),
  lastLogin: z.optional(z.string().transform(sanitizeString)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Password is required to set a new password!",
    path: ["password"]
  });

// Settings schema for validation
export const SettingsSchema = z.object({
  name: z.optional(z.string().transform(sanitizeString)),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.BIDDER, UserRole.SELLER]),
  email: z.optional(z.string().email().transform(sanitizeString)),
  password: z.optional(z.string().min(6).transform(sanitizeString)),
  newPassword: z.optional(z.string().min(6).transform(sanitizeString)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Password is required to set a new password!",
    path: ["password"]
  });*/