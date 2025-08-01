import z from "zod";
import { id } from "zod/v4/locales/index.cjs";

export const signupInput = z.object({
   email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
})

// type inference in zod    

export const signinInput = z.object({
   email: z.string().email(),
  password: z.string().min(6),
})

// type inference in zod    

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})


export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>

