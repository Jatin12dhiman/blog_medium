import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import {createBlogInput, updateBlogInput} from "gustakh-medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware: Auth check for all routes
blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  // const token = authHeader.replace("Bearer ", "");

  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (!user || !user.id) 
        throw new Error("Invalid token ya user m dikkat h ");
    // @ts-ignore
    c.set("userId", user.id);
    await next();
  } catch (err) {
    c.status(403);
    return c.json({ message: "You are not logged in" });
  }
});

// ✅ POST /api/v1/blog — Create a blog
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        message: "Inputs not correct",
      });
    }
  const authorId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId), 
    },
  });

  return c.json({ id: blog.id });
});

// ✅ PUT /api/v1/blog — Update a blog
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        message: "Inputs not correct",
      });
    }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({ id: blog.id });
});

// ✅ GET /api/v1/blog/bulk — Get all blogs
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select:{
      content:true,
      title:true,
      id:true,
      author:{
        select :{
          name:true
        }
      }
    }
  });

  return c.json({ blogs });
});

// ✅ GET /api/v1/blog — Get one blog by ID
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id"); 

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: { 
        id:Number(id)
    },
      select:{
        id:true,
        title: true,
        content: true,
        author:{
          select:{
            name:true
          }
        }
      }
    });

    return c.json({ blog });
  } catch (e) {
    c.status(411);
    return c.json({ message: "Error while fetching blog post" });
  }
});


