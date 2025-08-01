import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import {Hono} from "hono"
import {sign} from "hono/jwt"
import { signupInput , signinInput } from "gustakh-medium-common";



export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()


userRouter.post('/signup',async(c) => {
  // c means context which contains request, response and next etc
      const prisma = new PrismaClient({
        // @ts-ignore
        datasourceUrl : c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const body = await c.req.json()
      const {success} = signupInput.safeParse(body);
      if(!success){
        c.status(411);
        return c.json({
          message:"Inputs not correct"
        })
      }
      const user = await prisma.user.create({
      data:{
        email :body.email,
        password : body.password,
        name:body.name 
         }
      })
      // @ts-ignore
      const token =await sign({id:user.id},c.env.JWT_SECRET)
      
      return c.json({ 
        jwt: token
      })
})


userRouter.post('/signin',async (c) => {
  const prisma = new PrismaClient({
    // @ts-ignore
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body =await c.req.json()
      const {success} = signinInput.safeParse(body);
      if(!success){
        c.status(411);
        return c.json({
          message:"Inputs not correct"
        })
      }

  const user = await prisma.user.findUnique({
    where:{
      email: body.email,
      password: body.password
    }
  });
      if(!user){
        return c.json({error: "User not found"}, {status: 404})
      }
    
      // @ts-ignore
    const jwt =await sign({id: user.id} , c.env.JWT_SECRET);
    return c.json({jwt})
})
